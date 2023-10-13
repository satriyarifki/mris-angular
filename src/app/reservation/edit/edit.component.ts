import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { es } from 'date-fns/locale';
import {
  areIntervalsOverlapping,
  differenceInHours,
  differenceInMinutes,
  formatISO,
  setDefaultOptions,
} from 'date-fns';
import { zonedTimeToUtc, utcToZonedTime, format } from 'date-fns-tz';
import { AlertType } from 'src/app/services/alert/alert.model';
import { NgxSpinnerService } from 'ngx-spinner';

setDefaultOptions({ locale: es });

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent {
  idResv = this.actRouter.snapshot.params['id'];

  // API Variable
  reserv: any;
  reservs: any;
  resources: any;
  accessories: any;
  employee: any;

  //
  onProcess= false
  hourLength = 0;

  //Form
  form!: FormGroup;
  constructor(
    private router: Router,
    private actRouter: ActivatedRoute,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private authService: AuthService,
    private spinner : NgxSpinnerService
  ) {
    spinner.show()
    forkJoin(
      apiService.reservGetById(this.idResv),
      apiService.resourcesGet(),
      apiService.accessoriesGetById(this.idResv),
      apiService.reservGet()
    ).subscribe(([reservById, resources, accessories, reservs]) => {

      if (
        reservById == null ||
        (reservById?.level == 'Confidential' &&
          (authService.getUserData() == null ||
            (authService.getUserData()?.level > 5 &&
              Number(authService.getUserData()?.employee_code) !=
                Number(reservById?.userId))))
      ) {

        this.router.navigate(['/']);
      }
      // console.log(resources);

      this.reserv = reservById;
      this.reservs = reservs;
      this.resources = resources;
      this.accessories = accessories;
      console.log(this.reserv);
      this.hourLength = differenceInHours(new Date(this.reserv.end),new Date(this.reserv.begin))

      this.initialForm();
      authService.employeesGetById(this.reserv?.userId).subscribe((data) => {
        this.employee = data[0];
      });
      spinner.hide()
    },(err)=>{spinner.hide()});
  }
  get f() {
    return this.form.controls;
  }
  ngOnInit() {}

  initialForm() {
    this.form = this.formBuilder.group({
      userId: [this.authService.getUser().lg_nik],
      resourceId: [this.reserv?.resourceId | 0, Validators.required],
      laptop: [this.accessories?.laptop, Validators.required],
      panaboard: [this.accessories?.panaboard, Validators.required],
      papanTulis: [this.accessories?.papanTulis, Validators.required],
      projector: [this.accessories?.projector, Validators.required],
      pocari: [this.accessories?.pocari, Validators.required],
      soyjoy: [this.accessories?.soyjoy, Validators.required],
      begin: [
        formatISO(new Date(this.reserv.begin)).slice(0, 16),
        Validators.required,
      ],
      end: [
        formatISO(new Date(this.reserv.end)).slice(0, 16),
        Validators.required,
      ],
      length: [this.reserv?.length, Validators.required],
      repeat: [this.reserv?.repeat, Validators.required],
      level: [this.reserv?.level, Validators.required],
      title: [this.reserv?.title, Validators.required],
      description: [this.reserv?.description, Validators.required],
    });
  }

  onSubmit() {
    this.onProcess = true
    if (this.form.invalid) {
      this.onProcess = false
      this.alertService.onCallAlert('Fill Blank Inputs!', AlertType.Warning);
      return;
    }
    let body = {
      userId: this.f['userId'].value,
      resourceId: this.f['resourceId'].value,
      begin: new Date(this.f['begin'].value),
      end: new Date(this.f['end'].value),
      length:
        differenceInMinutes(
          new Date(this.f['end'].value),
          new Date(this.f['begin'].value)
        ) / 60,
      repeat: this.f['repeat'].value,
      title: this.f['title'].value,
      level: this.f['level'].value,
      description: this.f['description'].value,
    };
    let bodyAcs = {
      laptop: this.f['laptop'].value,
      panaboard: this.f['panaboard'].value,
      papanTulis: this.f['papanTulis'].value,
      projector: this.f['projector'].value,
      pocari: this.f['pocari'].value,
      soyjoy: this.f['soyjoy'].value,
    };
    if (this.isOverlappingTime(body.begin, body.end, body.resourceId)) {
      return;
    }
    this.apiService.reservUpdate(this.idResv, body).subscribe(
      (data) => {
        this.apiService.accessoriesUpdate(this.idResv, bodyAcs).subscribe(
          (elem) => {
            // console.log(elem);
            this.alertService.onCallAlert(
              'Update Reservation Success!',
              AlertType.Success
            );
          },
          (err) => {
            this.alertService.onCallAlert(
              'Update Reservation Failed!',
              AlertType.Error
            );
          }
        );
        this.onProcess = false
      },
      (er) => {
        this.onProcess = false
        this.alertService.onCallAlert(
          'Update Reservation Failed!',
          AlertType.Error
        );
      }
    );
  }

  isOverlappingTime(begin: any, end: any, resourceId: any) {
    let bool = false;
    // console.log(this.reserv);

    let reservation = this.reservs.filter(
      (data: any) =>
        format(new Date(data.begin), 'P') == format(new Date(begin), 'P') &&
        data.resourceId == resourceId &&
        data.id != this.idResv
    );
    try {
      if (reservation.length != 0) {
        // if (new Date(begin) > new Date(end)) {
        //   return;
        // } else {
        reservation.forEach((element: any) => {
          if (
            areIntervalsOverlapping(
              {
                start: new Date(element.begin),
                end: new Date(element.end),
              },
              { start: begin, end: end }
            )
          ) {
            bool = true;
            this.alertService.onCallAlert(
              'Date & Resource Booked! Choose Another!',
              AlertType.Error
            );
            return;
          }
        });
        // }
      }
    } catch (error) {
      // console.log('hh' + error);
      bool = true;
      this.alertService.onCallAlert(
        'Fill Begin and End Correctly!',
        AlertType.Error
      );
      return bool;
    }

    return bool;
  }

  changeHour() {
    console.log(new Date(this.f['begin'].value));
    console.log(this.f['end'].value);
    console.log();
    this.hourLength = differenceInHours(new Date(this.f['end'].value),new Date(this.f['begin'].value))
  }
}
