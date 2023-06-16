import { Component } from '@angular/core';


declare global {
  var age: number;
  var hourHalf: any[];
}
globalThis.hourHalf = [
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
globalThis.age = 18

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
}
