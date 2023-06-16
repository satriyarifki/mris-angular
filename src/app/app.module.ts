import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { ViewComponent } from './reservation/view/view.component';

@NgModule({
  declarations: [
    AppComponent,
    ScheduleComponent,
    NavbarComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
