import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../../shared/layout/layout.component';
import { AttendanceListComponent } from './attendance-list/attendance-list.component';
import { AttendanceHistoryComponent } from './attendance-history/attendance-history.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: AttendanceListComponent },
      { path: 'history', component: AttendanceHistoryComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }
