import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  format,
  differenceInHours,
  differenceInMinutes,
  areIntervalsOverlapping,
  differenceInDays,
  differenceInWeeks,
  addDays,
} from 'date-fns';
import { forkJoin } from 'rxjs';
import { AlertType } from 'src/app/services/alert/alert.model';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ApiService } from 'src/app/services/api.service';
let hour = [
  '07:00',
  '07:30',
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
];

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  form!: FormGroup;
  date = new Date();
  //Api Variabel
  resources: any;
  reservs: any[] = [];
  constructor(
    private router: Router,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {
    this.initialForm();
    forkJoin(apiService.resourcesGet(), apiService.reservGet()).subscribe(
      ([resources, reservAll]) => {
        this.resources = resources;
        this.reservs = reservAll;
      }
    );
  }
  get f() {
    return this.form.controls;
  }
  initialForm() {
    this.form = this.formBuilder.group({
      userId: [0],
      resourceId: ['', Validators.required],
      laptop: [false, Validators.required],
      panaboard: [false, Validators.required],
      papanTulis: [false, Validators.required],
      projector: [false, Validators.required],
      pocari: [false, Validators.required],
      soyjoy: [false, Validators.required],
      begin: ['', Validators.required],
      end: ['', Validators.required],
      length: [0, Validators.required],
      repeat: [false, Validators.required],
      repeatWeek: [1, Validators.required],
      repeatRecurrence: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.form.invalid) {
      console.log('fail');
      console.log(this.f);

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
      description: this.f['description'].value,
    };
    let bodyAcs = {
      reservationId: 0,
      laptop: this.f['laptop'].value,
      panaboard: this.f['panaboard'].value,
      papanTulis: this.f['papanTulis'].value,
      projector: this.f['projector'].value,
      pocari: this.f['pocari'].value,
      soyjoy: this.f['soyjoy'].value,
    };
    if (this.isOverlappingTime(body.begin, body.end, body.resourceId)) {
      this.alertService.onCallAlert(
        'Date & Resource Booked! Choose Another!',
        AlertType.Error
      );
      return;
    }

    if (body.repeat) {
      let repeatLength =
        (differenceInWeeks(
          new Date(this.f['repeatRecurrence'].value),
          new Date(this.f['begin'].value)
        ) /
          this.f['repeatWeek'].value) |
        0;
      let loopDate = new Date(this.f['begin'].value);
      console.log(repeatLength);

      for (let index = 0; index <= repeatLength; index++) {
        body.begin = addDays(
          new Date(this.f['begin'].value),
          index * (7 * this.f['repeatWeek'].value)
        );
        body.end = addDays(
          new Date(this.f['end'].value),
          index * (7 * this.f['repeatWeek'].value)
        );
        console.log(body.begin);
        this.apiService.reservPost(body).subscribe(
          (data) => {
            console.log(data);
            bodyAcs.reservationId = data.id;
            this.apiService.accessoriesPost(bodyAcs).subscribe(
              (elem) => {
                console.log(elem);
                this.alertService.onCallAlert(
                  'Booked Reservation Success!',
                  AlertType.Success
                );
                this.router.navigate(['/']);
              },
              (er) => {
                console.log(er);

                this.alertService.onCallAlert(
                  'Booked Reservation Fail!',
                  AlertType.Error
                );
              }
            );
          },
          (err) => {
            console.log(err);

            this.alertService.onCallAlert(
              'Booked Reservation Fail!',
              AlertType.Error
            );
          }
        );
      }
    } else {
      this.apiService.reservPost(body).subscribe(
        (data) => {
          console.log(data);
          bodyAcs.reservationId = data.id;
          this.apiService.accessoriesPost(bodyAcs).subscribe(
            (elem) => {
              console.log(elem);
              this.alertService.onCallAlert(
                'Booked Reservation Success!',
                AlertType.Success
              );
              this.router.navigate(['/']);
            },
            (er) => {
              console.log(er);

              this.alertService.onCallAlert(
                'Booked Reservation Fail!',
                AlertType.Error
              );
            }
          );
        },
        (err) => {
          console.log(err);

          this.alertService.onCallAlert(
            'Booked Reservation Fail!',
            AlertType.Error
          );
        }
      );
    }

    //
  }

  isOverlappingTime(begin: any, end: any, resourceId: any) {
    let bool = false;
    let reservation = this.reservs.filter(
      (data: any) =>
        format(new Date(data.begin), 'P') == format(new Date(begin), 'P') &&
        data.resourceId == resourceId
    );

    if (reservation.length != 0) {
      reservation.forEach((element) => {
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
          return;
        }
      });
    }
    return bool;
  }
  repeatChanges() {
    console.log(this.f['repeat'].value);
    if (this.f['repeat'].value) {
      this.f['repeatWeek'].setValue(1);
      this.f['repeatRecurrence'].setValue('');
    }
  }
}
