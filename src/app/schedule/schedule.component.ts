import { IfStmt } from '@angular/compiler';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { format, isYesterday, nextDay, previousDay, previousSunday, nextSaturday } from 'date-fns'

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
const booked = [
  {
    id: 1,
    dayName: 'Wednesday',
    date: '06/14/2023',
    start: '08',
    room: 'For The Future (Floor 1st VIP)',
    longHours: 3,
  },
  {
    id: 2,
    dayName: 'Wednesday',
    date: '06/14/2023',
    start: '14',
    room: 'For The Future (Floor 1st VIP)',
    longHours: 2,
  },
  {
    id: 3,
    dayName: 'Wednesday',
    date: '06/14/2023',
    start: '16',
    room: 'For The Future (Floor 1st VIP)',
    longHours: 2,
  },
  {
    id: 4,
    dayName: 'Wednesday',
    date: '06/14/2023',
    start: '13',
    room: 'Passion (2nd Floor Small)',
    longHours: 4,
  },
  {
    id: 5,
    dayName: 'Monday',
    date: '06/19/2023',
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
  booked = booked;

  // Variable Date
  @Input() inputDate = format(new Date(), 'P');
  currentDate: any;
  
  arrayDateinWeek: any[] = [];

  // Variable
  total: number = 0;
  dateNow = new Date();
  
  

  constructor(private router: Router) {
    // console.log(this.filterBooked);
    let f = globalThis.age;
    f = 14;
    console.log(hourHalf);
    console.log(this.getFirstDayOfWeek(new Date()));
    console.log(this.getLastDayOfWeek(new Date()));
    this.loopWeekDate(new Date())
    console.log(this.arrayDateinWeek);
    
    
  }
  ngOnInit(){
    // this.inputDate = format(new Date(), 'P');
  }
  sendTheNewValue(event:any){
    // console.log(event.srcElement.valueAsDate);
    this.loopWeekDate(event.srcElement.valueAsDate)
    
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
        hour.splice(hour.indexOf(element.start) + 1, element.longHours * 2 - 1);

        // console.log(element);
        // console.log(hour.indexOf(element.start)+1);

        // console.log(hour);
      });
    }
    return hour;
  }
  filterBooked(date: any, room: any) {
    return this.booked.filter(
      (data: any) => data.date == date && data.room == room
    );
  }
  filterBookedWithHour(day: any,date: any, room: any, start: any) {
    return this.booked.filter(
      (data: any) =>
        data.date == date && data.room == room && data.start == start && data.dayName == day
    );
  }

  loopWeekDate(date: any) {
    this.arrayDateinWeek.length = 0;
    var firstDay = date;
    firstDay = this.getFirstDayOfWeek(date);
    var lastDay = this.getLastDayOfWeek(date);
    if (date.getDay() == 0) {
      
      firstDay = date
      lastDay = nextSaturday(firstDay)
      console.log('first');
      
    } else if (date.getDay() == 6){
      lastDay == date
      console.log('last');
    }
    console.log('first: ' + firstDay);
    console.log('last: ' + lastDay);
    
    

    while (firstDay <= lastDay) {
      this.arrayDateinWeek.push({
        date: firstDay.getDate(),
        year: firstDay.getFullYear(),
        month: firstDay.getMonth(),
        dayName: firstDay.toLocaleString('en-us', {weekday:'long'}),
        full: format(firstDay, 'P'),
        localeString : format(firstDay, 'yyyy-MM-dd'),
      });
      
      firstDay.setDate(firstDay.getDate() + 1);
    }
    console.log(this.arrayDateinWeek);
    
    
  }
  getFirstDayOfWeek(d: any) {
    // 👇️ clone date object, so we don't mutate it
    const date = new Date(d);
    const day = date.getDay(); // 👉️ get day of week

    // 👇️ day of month - day of week (-6 if Sunday), otherwise +1
    const diff = date.getDate() - day + (day === 0 ? -6 : 0);
    // console.log(d);

    return new Date(date.setDate(diff));
  }
  getLastDayOfWeek(d: any) {
    // 👇️ clone date object, so we don't mutate it

    const date = new Date(d);
    const day = date.getDay(); // 👉️ get day of week

    // 👇️ day of month - day of week (-6 if Sunday), otherwise +1
    const diff = date.getDate() - day + (day == 0 ? 0 : 6);

    return new Date(date.setDate(diff));
  }
  nextWeek() {
    console.log('next');
    console.log(nextDay(new Date(this.arrayDateinWeek[6].full),0) );
    
    this.loopWeekDate(nextDay(new Date(this.arrayDateinWeek[6].full),1));
  }
  previousWeek() {
    console.log('prev');
    console.log(previousDay(new Date(this.arrayDateinWeek[0].full),0));

    this.loopWeekDate(previousDay(new Date(this.arrayDateinWeek[0].full),1));
  }
  button(id: any) {
    this.router.navigate(['/view-reservation/', id]);
  }
  buttonCreate() {
    console.log('create');

    this.router.navigate(['/create-reservation']);
  }
}
