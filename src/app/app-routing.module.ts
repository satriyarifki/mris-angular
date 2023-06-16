import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleComponent } from './schedule/schedule.component';
import { ViewComponent } from './reservation/view/view.component';

const routes: Routes = [
  { path: '', component: ScheduleComponent },
  { path: 'view-reservation/:id', component: ViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
