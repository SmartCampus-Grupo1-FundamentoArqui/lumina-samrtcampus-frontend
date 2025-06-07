import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassroomsRoutingModule } from './classrooms-routing.module';
import { ClassroomsHomeComponent } from './classrooms-home/classrooms-home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {ClassroomsCoursesComponent} from "./classrooms-home/classrooms-courses/classrooms-courses.component";
import {
    ClassroomsAttendanceComponent
} from "./classrooms-home/classrooms-courses/classrooms-attendance/classrooms-attendance.component";
import {
    ClassroomGradesComponent
} from "./classrooms-home/classrooms-courses/classrooms-grades/classroom-grades.component";

@NgModule({
    declarations: [ClassroomsHomeComponent,ClassroomsCoursesComponent,ClassroomsAttendanceComponent,ClassroomGradesComponent],
    imports: [
        CommonModule,
        ClassroomsRoutingModule,
        SharedModule
    ]
})
export class ClassroomsModule { }
