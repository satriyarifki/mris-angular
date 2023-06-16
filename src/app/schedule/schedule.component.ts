import { IfStmt } from '@angular/compiler';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

const hour = [
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
];
const hourHalf = [
  '07',
  '07:30',
  '08',
  '08:30',
  '09',
  '09:30',
  '10',
  '10:30',
  '11',
  '11:30',
  '12',
  '12:30',
  '13',
  '13:30',
  '14',
  '14:30',
  '15',
  '15:30',
  '16',
  '16:30',
  '17',
  '17:30',
  '18',
  '18:30',
  '19',
  '19:30',
  '20',
  '20:30',
];
const roomName = [
  'Creative (Meeting Production)',
  'For The Future (Floor 1st VIP)',
  'Respect (Meeting Snackbar)',
  'VIP Canteen (Meeting Canteen)',
  'Passion (2nd Floor Small)',
  'One For All (2nd Floor Big)',
  'Rumah Belajar',
  'Credible (Logistik)',
];

const dayInAWeek = [
  'Sunday 16/06/2023',
  'Monday 17/06/2023',
  'Tuesday 18/06/2023',
  'Wednesday 19/06/2023',
  'Thursday 20/06/2023',
  'Friday 21/06/2023',
  'Saturday 22/06/2023',
];

const booked = [
  {
    id: 1,
    date: 'Wednesday 19/06/2023',
    start: '08',
    room: 'For The Future (Floor 1st VIP)',
    longHours: 3,
  },
  {
    id: 2,
    date: 'Wednesday 19/06/2023',
    start: '14',
    room: 'For The Future (Floor 1st VIP)',
    longHours: 2,
  },
  {
    id: 3,
    date: 'Wednesday 19/06/2023',
    start: '16',
    room: 'For The Future (Floor 1st VIP)',
    longHours: 2,
  },
  {
    id: 4,
    date: 'Wednesday 19/06/2023',
    start: '13',
    room: 'Passion (2nd Floor Small)',
    longHours: 4,
  },
  {
    id: 5,
    date: 'Monday 17/06/2023',
    start: '08',
    room: 'Rumah Belajar',
    longHours: 2,
  },
];

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent {
  hours = hour;
  hourHalf = hourHalf;
  roomName = roomName;
  dayInAWeek = dayInAWeek;
  booked = booked;
  total: number = 0;

  constructor(private router: Router) {
    // console.log(this.filterBooked);
    let f = globalThis.age;
    f = 14;
    console.log(hourHalf);
  }

  ColspanLength(date: any, room: any) {
    let data = this.filterBooked(date, room);
    let minHour = 0;
    data.forEach((element) => {
      minHour += element.longHours;
      // console.log(minHour);
    });
    return 28 - minHour * 2;
  }
  changeHourArray(date: any, room: any, hours: any) {
    let data = this.filterBooked(date, room);
    let hour = [
      '07',
      '07:30',
      '08',
      '08:30',
      '09',
      '09:30',
      '10',
      '10:30',
      '11',
      '11:30',
      '12',
      '12:30',
      '13',
      '13:30',
      '14',
      '14:30',
      '15',
      '15:30',
      '16',
      '16:30',
      '17',
      '17:30',
      '18',
      '18:30',
      '19',
      '19:30',
      '20',
      '20:30',
    ];

    if (data.length != 0) {
      data.forEach((element) => {
        hour.splice(hour.indexOf(element.start)+1, (element.longHours * 2) - 1);

        // console.log(element);
        // console.log(hour.indexOf(element.start)+1);
        
        // console.log(hour);
        
      });
      
    }
    return hour

    
  }
  filterBooked(date: any, room: any) {
    return this.booked.filter(
      (data: any) => data.date == date && data.room == room
    );
  }
  filterBookedWithHour(date: any, room: any, start: any) {
    return this.booked.filter(
      (data: any) =>
        data.date == date && data.room == room && data.start == start
    );
  }
  button(id:any) {
    console.log('Click Success');
    this.router.navigate(['/view-reservation/', id])
  }
}
