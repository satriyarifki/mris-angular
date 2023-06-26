import { Component, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AlertType } from 'src/app/services/alert/alert.model';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  show: Boolean = false;
  alertType = AlertType;
  message: any;
  type: any = AlertType.None;

  constructor(public router: Router, private alertService: AlertService) {}

  ngOnChanges(changes: SimpleChanges): void {}

  callAlert(alert: any) {
    if (alert.message != '') {
      this.show = true;
      this.message = alert.message;
      this.type = alert.type;

      setTimeout(() => {
        this.show = false;
        this.message = '';
        this.type = AlertType.None;
      }, 7000);
    }
  }

  ngOnInit() {
    if (this.alertService.subsVar == undefined) {
      this.alertService.subsVar = this.alertService.invokeAlert.subscribe(
        (alert: any) => {
          this.callAlert(alert);
        }
      );
    }
    //
  }

  closeAlert() {
    this.message = '';
    this.type = AlertType.None;
    this.show = false;
  }
}
