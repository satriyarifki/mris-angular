import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
const resv = [
  {
    id: 1,
    user: 'Gardha Gilang Ramadan (gramadhan@aio.co.id)',
    resources:
      'One For All, All For One (2nd Floor Big) include vidcon besar yealink',
    accessories: '',
    begin: '06/16/2023 8:00 AM',
    end: '06/16/2023 5:00 PM',
    reservLength: '0 days, 9 hours',
    repeat: 'Does Not Repeat',
    title: 'engineer shikoku dan csi',
    desc: 'office teknisi shikoku dan csi',
  },
  {
    id: 2,
    user: 'Ramadan (gramadhan@aio.co.id)',
    resources:
      'One For All, All For One (2nd Floor Big) include vidcon besar yealink',
    accessories: '',
    begin: '06/16/2023 8:00 AM',
    end: '06/16/2023 5:00 PM',
    reservLength: '0 days, 9 hours',
    repeat: 'Does Not Repeat',
    title: 'engineer shikoku dan csi',
    desc: 'office teknisi shikoku dan csi',
  },
  {
    id: 3,
    user: 'Gardha Ramadan (gramadhan@aio.co.id)',
    resources:
      'One For All, All For One (2nd Floor Big) include vidcon besar yealink',
    accessories: '',
    begin: '06/16/2023 8:00 AM',
    end: '06/16/2023 5:00 PM',
    reservLength: '0 days, 9 hours',
    repeat: 'Does Not Repeat',
    title: 'engineer shikoku dan csi',
    desc: 'office teknisi shikoku dan csi',
  },
  {
    id: 4,
    user: 'Gardha Gilang (gramadhan@aio.co.id)',
    resources:
      'One For All, All For One (2nd Floor Big) include vidcon besar yealink',
    accessories: '',
    begin: '06/16/2023 8:00 AM',
    end: '06/16/2023 5:00 PM',
    reservLength: '0 days, 9 hours',
    repeat: 'Does Not Repeat',
    title: 'engineer shikoku dan csi',
    desc: 'office teknisi shikoku dan csi',
  },
  {
    id: 5,
    user: 'Gilang Ramadan (gramadhan@aio.co.id)',
    resources:
      'One For All, All For One (2nd Floor Big) include vidcon besar yealink',
    accessories: '',
    begin: '06/16/2023 8:00 AM',
    end: '06/16/2023 5:00 PM',
    reservLength: '0 days, 9 hours',
    repeat: 'Does Not Repeat',
    title: 'engineer shikoku dan csi',
    desc: 'office teknisi shikoku dan csi',
  },
];

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent {
  idResv = this.actRouter.snapshot.params['id'];
  resv = resv;

  // API Variable
  reserv: any;
  resources: any;
  accessories: any;
  constructor(
    private actRouter: ActivatedRoute,
    private apiService: ApiService,
    private authService: AuthService
  ) {
    console.log();
    forkJoin(
      apiService.reservGetById(this.idResv),
      apiService.resourcesGet(),
      apiService.accessoriesGetById(this.idResv)
    ).subscribe(([reservById, resources, accessories]) => {
      this.reserv = reservById;
      this.resources = resources;
      this.accessories = accessories;
      console.log(this.accessories);
      
    });
  }
  filterReservationById(id: any) {
    return this.resv?.filter((data: any) => data.id == id);
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
}
