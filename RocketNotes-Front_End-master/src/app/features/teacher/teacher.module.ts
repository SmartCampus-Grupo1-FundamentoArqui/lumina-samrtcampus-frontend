import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersComponent } from './teachers/teachers.component';
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {TeacherRoutingModule} from "./teacher-routing.module";
import { DialogTeacherComponent } from './dialog-teacher/dialog-teacher.component';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TeacherCoursesDialogComponent } from './teacher-courses-dialog/teacher-courses-dialog.component';



@NgModule({
  declarations: [
    TeachersComponent,
    DialogTeacherComponent,
    TeacherCoursesDialogComponent
  ],
    imports: [
        CommonModule,
        MatIconModule,
        MatTableModule,
        TeacherRoutingModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        FormsModule,
        MatSnackBarModule,
        MatProgressSpinnerModule
    ]
})
export class TeacherModule { }
