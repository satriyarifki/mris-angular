import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleComponent } from './schedule/schedule.component';
import { ViewComponent } from './reservation/view/view.component';
import { CreateComponent } from './reservation/create/create.component';
import { LoginComponent } from './auth/login/login.component';
import { OnAuthGuard, OutAuthGuard } from './services/guard/guard.guard';
import { AuthService } from './services/auth/auth.service';

const routes: Routes = [
  { path: '', component: ScheduleComponent },
  { path: 'view-reservation/:id', component: ViewComponent },
  {
    path: 'create-reservation',
    component: CreateComponent,
  },
  { path: 'login', component: LoginComponent, canActivate: [OutAuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
