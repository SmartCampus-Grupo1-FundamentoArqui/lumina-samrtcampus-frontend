import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentListComponent } from './student-list/student-list.component';
import {SharedModule} from "../../shared/shared.module";
import {StudentsRoutingModule} from "./student-routing.module";
import { DialogStudentComponent } from './dialog-student/dialog-student.component';



@NgModule({
  declarations: [
    StudentListComponent,
    DialogStudentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StudentsRoutingModule
  ]
})
export class StudentModule { }
