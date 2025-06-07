import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { ClassroomsHomeComponent } from './classrooms-home/classrooms-home.component';
import {ClassroomsCoursesComponent} from "./classrooms-home/classrooms-courses/classrooms-courses.component";
import {ClassroomsAttendanceComponent} from "./classrooms-home/classrooms-courses/classrooms-attendance/classrooms-attendance.component";
import {
  ClassroomGradesComponent
} from "./classrooms-home/classrooms-courses/classrooms-grades/classroom-grades.component";

const routes: Routes = [

  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: ClassroomsHomeComponent },
      { path: 'courses', component: ClassroomsCoursesComponent },
      { path: 'courses/attendance', component: ClassroomsAttendanceComponent },
      { path: 'courses/grades', component: ClassroomGradesComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassroomsRoutingModule { }
