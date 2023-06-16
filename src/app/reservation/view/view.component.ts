import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private actRouter: ActivatedRoute) {
    console.log();
  }
  filterReservationById(id: any) {
    return this.resv.filter((data: any) => data.id == id);
  }
}
