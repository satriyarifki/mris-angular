import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleComponent } from './schedule/schedule.component';
import { ViewComponent } from './reservation/view/view.component';
import { CreateComponent } from './reservation/create/create.component';

const routes: Routes = [
  { path: '', component: ScheduleComponent },
  { path: 'view-reservation/:id', component: ViewComponent },
  { path: 'create-reservation', component: CreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
