import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertType } from 'src/app/services/alert/alert.model';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

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
globalThis.age = 18;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  userBool = false
  constructor(public authService: AuthService, private router: Router, private alertService: AlertService) {
    // console.log(this.authService.getUserData());
    
  }
  onAuthCheck() {
    if (this.authService.getToken() != null) {
      return false;
    }
    return true;
  }
  userDropdown(){
    this.userBool = !this.userBool
  }

  signOut() {
    this.authService.signOut();
    this.alertService.onCallAlert('Log Out Sucess!', AlertType.Success)
    this.router.navigate(['/login']);
  }
}
