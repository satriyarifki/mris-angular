import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AlertType } from 'src/app/services/alert/alert.model';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent {
  idResv = this.actRouter.snapshot.params['id'];

  // API Variable
  reserv: any;
  resources: any;
  accessories: any;
  employee: any;
  constructor(
    private actRouter: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private authService: AuthService,
    private alertService: AlertService
  ) {
    console.log();
    forkJoin(
      apiService.reservGetById(this.idResv),
      apiService.resourcesGet(),
      apiService.accessoriesGetById(this.idResv)
    ).subscribe(([reservById, resources, accessories]) => {
      console.log(
        authService.getUserData() == null ||
          (authService.getUserData()?.level > 5 &&
            Number(authService.getUserData()?.employee_code) !=
              Number(reservById?.userId))
      );

      if (
        reservById == null ||
        (reservById?.level == 'Confidential' &&
          (authService.getUserData() == null ||
            (authService.getUserData()?.level > 5 &&
              Number(authService.getUserData()?.employee_code) !=
                Number(reservById?.userId))))
      ) {
        console.log(
          authService.getUserData()?.level > 5 ||
            Number(authService.getUserData()?.employee_code) ==
              Number(reservById?.userId)
        );

        this.router.navigate(['/']);
      }
      this.reserv = reservById;
      this.resources = resources;
      this.accessories = accessories;
      authService.employeesGetById(this.reserv?.userId).subscribe((data) => {
        this.employee = data[0];
      });
    });
  }

  filterResourcesById(id: any) {
    return this.resources?.filter((data: any) => data.id == id)[0];
  }
  onAuthCheck() {
    if (this.authService.getToken() != null) {
      return true;
    }
    return false;
  }
  deleteReserv(id: any) {
    console.log('test');

    this.apiService.reservDelete(id).subscribe((data) => {
      console.log(data);
      this.alertService.onCallAlert('Delete Successfull!', AlertType.Success);
    });
    this.router.navigate(['/']);
    // window.location.reload();
  }
}
