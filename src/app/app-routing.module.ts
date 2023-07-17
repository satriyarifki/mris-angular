import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleComponent } from './schedule/schedule.component';
import { ViewComponent } from './reservation/view/view.component';
import { CreateComponent } from './reservation/create/create.component';
import { LoginComponent } from './auth/login/login.component';
import { OutAuthGuard } from './services/guard/guard.guard';
import { OnAuthGuard } from './services/guard/on-auth.guard';
import { AuthService } from './services/auth/auth.service';
import { NotFoundComponent } from './layouts/not-found/not-found.component';
import { EditComponent } from './reservation/edit/edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'schedule', pathMatch: 'full' },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'view-reservation/:id', component: ViewComponent },
  { path: 'edit-reservation/:id', component: EditComponent },
  {
    path: 'create-reservation',
    component: CreateComponent,
    canActivate: [OnAuthGuard],
  },
  { path: 'login', component: LoginComponent, canActivate: [OutAuthGuard] },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
