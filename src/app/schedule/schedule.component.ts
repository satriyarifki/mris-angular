import { Component, Input, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import {
  format,
  isYesterday,
  nextDay,
  previousDay,
  previousSunday,
  nextSaturday,
  parseISO,
  set,
  compareAsc,
  isBefore,
  isWithinInterval,
} from 'date-fns';
import { enUS, enIN } from 'date-fns/locale'
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth/auth.service';

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

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent implements OnInit {
  hours = hour;
  hourHalf = hourHalf;
  roomName = roomName;

  // Variable Date
  @Input() inputDate = format(new Date(), 'P');
  currentDate: any;

  arrayDateinWeek: any[] = [];
  reservApi: any[] = [];
  resourcesApi: any[] = [];
  employeeData: any;
  employeesKejayan: any;
  filterBookedSave: any;

  // Variable
  total: number = 0;
  dateNow = new Date();

  // Params
  dateParams = this.actRouter.snapshot.queryParams['date'];

  constructor(
    private authService: AuthService,
    private router: Router,
    private actRouter: ActivatedRoute,
    private apiService: ApiService,
    public spinner: NgxSpinnerService
  ) {
    this.spinner.show('cahya');
    forkJoin(
      apiService.reservGet(),
      apiService.resourcesGet(),
      authService.employeesKejayanGet()
    ).subscribe(
      ([reserv, resources, employeeKejayan]) => {
        this.reservApi = reserv;
        this.resourcesApi = resources;
        this.employeesKejayan = employeeKejayan;
        // console.log(this.resourcesApi);

        this.spinner.hide('cahya');
      },
      (err) => {
        this.spinner.hide('cahya');
      }
    );

    if (this.onAuthCheck()) {
      this.employeeData = authService.getUserData();
    }
    if (this.dateParams) {
      this.loopWeekDate(new Date(this.dateParams));
    } else {
      this.loopWeekDate(new Date());
    }

    // this.isDateTimePast(new Date(), '17:00')
  }
  ngOnInit() {
    // this.inputDate = format(new Date(), 'P');
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // Navigation is starting... show a loading spinner perhaps?
        // blog on that here: ultimatecourses.com/blog/angular-loading-spinners-with-router-events
        if (event.url.includes('/schedule')) {
        }
      }
      if (event instanceof NavigationEnd) {
        // We've finished navigating
      }
      if (event instanceof NavigationError) {
        // something went wrong, log the error
      }
    });
  }

  // spinnerHide(){
  //   console.log('done');

  // }
  sendTheNewValue(event: any) {
    // console.log(event.srcElement.valueAsDate);
    this.router.navigate([], {
      relativeTo: this.actRouter,
      queryParams: {
        date: event.srcElement.valueAsDate,
      },
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });
    this.loopWeekDate(event.srcElement.valueAsDate);
  }
  ColspanLength(date: any, room: any) {
    let data = this.filterReserv(date, room);
    let minHour = 0;
    data.forEach((element) => {
      minHour += element.length;
      // console.log(minHour);
    });
    return 28 - minHour * 2;
  }
  changeHourArray(date: any, room: any, hours: any) {
    let data = this.filterReserv(date, room);

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

    if (data.length != 0) {
      // data.forEach((element) => {
      //   hour.splice(hour.indexOf(element.start) + 1, element.longHours * 2 - 1);
      // });
      if (format(new Date(data[0].begin), 'P') != date && format(new Date(data[0].end), 'P') == date) {
        hour.splice(
          1,
          hour.indexOf(String(format(new Date(data[0].end), 'HH:mm'))) -1
        );
      }
      else if (format(new Date(data[0].begin), 'P') != date && format(new Date(data[0].end), 'P') != date) {
        hour.splice(
          1,
          hour.length
        );
      } else {
        data.forEach((element) => {
          if (
            element.length <=
            hour.length -
              hour.indexOf(String(format(new Date(element.begin), 'HH:mm'))) +
              1
          ) {
            hour.splice(
              hour.indexOf(String(format(new Date(element.begin), 'HH:mm'))) + 1,
              element?.length * 2 - 1
            );
          }
          if (
            element.length >
            hour.length -
              hour.indexOf(String(format(new Date(element.begin), 'HH:mm'))) +
              1
          ) {
            // console.log(element.length);
            hour.splice(
              hour.indexOf(String(format(new Date(element.begin), 'HH:mm'))) + 1,
              hour.length -
                hour.indexOf(String(format(new Date(element.begin), 'HH:mm'))) +
                1
            );
            // console.log(hour.length);
          }
        });
      }
      
      // console.log(hour.length);
    }
    if (hour.length != 28) {
      // console.log(hour.length);
      // console.log(hour);
      // console.log('');
    }

    return hour;
  }

  filterReserv(date: any, room: any) {
    // if (this.onAuthCheck() && this.employeeData?.level <= 5) {
    //   // console.log('p');
    //   return this.reservApi.filter(
    //     (data: any) =>
    //       format(new Date(data.begin), 'P') == date && data.resourceId == room
    //   );
    // }
    // if (this.onAuthCheck()) {
    //   // console.log('pp');
    //   return this.reservApi.filter(
    //     (data: any) =>
    //       format(new Date(data.begin), 'P') == date &&
    //       data.resourceId == room &&
    //       (data.level == 'General' ||
    //         Number(data.userId) == Number(this.employeeData?.employee_code))
    //   );
    // } else {
    //   // console.log('pp');
    //   return this.reservApi.filter(
    //     (data: any) =>
    //       format(new Date(data.begin), 'P') == date &&
    //       data.resourceId == room &&
    //       data.level == 'General'
    //   );
    // }
    let reserv = this.reservApi.filter(
      (data: any) =>
        format(new Date(data.begin), 'P') == date && data.resourceId == room
    );

    if(reserv.length == 0){
       reserv = this.reservApi.filter(
        (data: any) => 
        isWithinInterval(new Date(date.slice(6,10),date.slice(3,5)-1,date.slice(0,2),6), {start:new Date(data.begin), end:new Date(data.end)})
        && data.resourceId == room
      )
        
    }
    return reserv
  }
  filterBookedWithHour(day: any, date: any, room: any, start: any) {
    // if (this.onAuthCheck() && this.employeeData?.level <= 5) {
    //   console.log('p');
    //   return this.reservApi.filter(
    //     (data: any) =>
    //       format(new Date(data.end), 'P') == date &&
    //       data.resourceId == room &&
    //       format(new Date(data.begin), 'HH:mm') == start
    //   );
    // } else if (this.onAuthCheck()) {
    //   console.log(date + ' - ' + room + ' - ' + start + ' - ' + day);
    //   return this.reservApi.filter(
    //     (data: any) =>
    //       format(new Date(data.end), 'P') == date &&
    //       data.resourceId == room &&
    //       format(new Date(data.begin), 'HH:mm') == start &&
    //       (data.level == 'General' ||
    //         Number(data.userId) == Number(this.employeeData?.employee_code))
    //   );
    // } else {
    //   // console.log('pp');
    //   return this.reservApi.filter(
    //     (data: any) =>
    //       format(new Date(data.end), 'P') == date &&
    //       data.resourceId == room &&
    //       format(new Date(data.begin), 'HH:mm') == start &&
    //       data.level == 'General'
    //   );
    // }
    // console.log(date + ' - ' + room + ' - ' + start + ' - ' + day);
    // console.log(date);

    return this.reservApi.filter(
      (data: any) =>
        format(new Date(data.begin), 'P') == date &&
        data.resourceId == room &&
        format(new Date(data.begin), 'HH:mm') == start
    );
  }

  saveFilterBooked(parms: any) {
    this.filterBookedSave = this.filterBookedWithHour(
      parms.day,
      parms.date,
      parms.room,
      parms.start
    );
    // console.log(this.filterBookedSave);
  }

  formatDate(date:any){
    return format(new Date(date), 'P')
  }

  loopWeekDate(date: any) {
    this.arrayDateinWeek.length = 0;
    var firstDay = date;
    firstDay = this.getFirstDayOfWeek(date);
    var lastDay = this.getLastDayOfWeek(date);
    if (date.getDay() == 0) {
      firstDay = date;
      lastDay = nextSaturday(firstDay);
    } else if (date.getDay() == 6) {
      lastDay == date;
    }

    while (firstDay <= lastDay) {
      this.arrayDateinWeek.push({
        date: firstDay.getDate(),
        year: firstDay.getFullYear(),
        month: firstDay.getMonth(),
        dayName: firstDay.toLocaleString('en-us', { weekday: 'long' }),
        full: format(firstDay, 'P'),
        dateDefault: format(firstDay, 'PP', {locale: enIN}),
        localeString: format(firstDay, 'yyyy-MM-dd'),
        datefull: format(firstDay, 'MM-dd-yyyy'),
      });
      // console.log(format(firstDay, 'PPP'));
      
      firstDay.setDate(firstDay.getDate() + 1);
    }
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
  async nextWeek() {
    this.spinner.show('cahya');
    await this.router.navigate([], {
      relativeTo: this.actRouter,
      queryParams: {
        date: nextDay(new Date(this.arrayDateinWeek[6].datefull), 1),
      },
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });
    this.loopWeekDate(nextDay(new Date(this.arrayDateinWeek[6].datefull), 1));
    await this.spinner.hide('cahya');
  }
  getEmployeeName(userId: any) {
    let emp;
    return this.employeesKejayan.filter(
      (data: any) => Number(data.employee_code) == Number(userId)
    )[0];
  }
  previousWeek() {
    this.spinner.show('cahya');
    this.router.navigate([], {
      relativeTo: this.actRouter,
      queryParams: {
        date: previousDay(new Date(this.arrayDateinWeek[0].datefull), 1),
      },
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });
    this.loopWeekDate(
      previousDay(new Date(this.arrayDateinWeek[0].datefull), 1)
    );
    this.spinner.hide('cahya');
  }
  button(id: any) {
    this.router.navigate(['/view-reservation/', id]);
  }
  buttonCreate(date: any, time: any, room: any) {
    const datetime = set(new Date(date), {
      hours: time.slice(0, 2),
      minutes: time.slice(3, 5),
    });
    this.router.navigate(['/create-reservation'], {
      queryParams: { datetime: datetime, roomId: room },
    });
  }
  onAuthCheck() {
    if (this.authService.getToken() == null) {
      return false;
    }
    return true;
  }
  isDateTimePast(date: any, time: any) {
    // console.log(new Date(date));
    if (
      isBefore(
        set(new Date(date), {
          hours: time.slice(0, 2),
          minutes: time.slice(3, 5),
        }),
        new Date()
      )
      // compareAsc(
      //   set(new Date(date), {
      //     hours: time.slice(0, 2),
      //     minutes: time.slice(3, 5),
      //   }),
      //   new Date()
      // ) == -1
    ) {
      // console.log(set(new Date(date), {
      //   hours: time.slice(0, 2),
      //   minutes: time.slice(3, 5),
      // }))

      return true;
    } else {
      // console.log(set(new Date(date), {
      //   hours: time.slice(0, 2),
      //   minutes: time.slice(3, 5),
      // }))

      return false;
    }
    console.log(
      compareAsc(
        set(new Date(date), {
          hours: time.slice(0, 2),
          minutes: time.slice(3, 5),
        }),
        new Date()
      )
    );
  }
}
