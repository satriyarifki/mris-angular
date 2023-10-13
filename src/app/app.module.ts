import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { ViewComponent } from './reservation/view/view.component';
import { CreateComponent } from './reservation/create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './auth/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './layouts/alert/alert.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { NotFoundComponent } from './layouts/not-found/not-found.component';
import { EditComponent } from './reservation/edit/edit.component';
import { FooterComponent } from './layouts/footer/footer.component';

// import { MatFormFieldModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    ScheduleComponent,
    NavbarComponent,
    ViewComponent,
    CreateComponent,
    LoginComponent,
    AlertComponent,
    NotFoundComponent,
    EditComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
