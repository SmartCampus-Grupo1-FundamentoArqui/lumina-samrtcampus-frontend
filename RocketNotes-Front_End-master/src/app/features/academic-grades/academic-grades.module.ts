import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AcademicGradesRoutingModule } from './academic-grades-routing.module';
import { AcademicGradesListComponent } from './academic-grades-list/academic-grades-list.component';
import { AcademicGradeDialogComponent } from './academic-grade-dialog/academic-grade-dialog.component';

import { CustomMaterialModule } from '../../custom-material/custom-material.module';

@NgModule({
  declarations: [
    AcademicGradesListComponent,
    AcademicGradeDialogComponent
  ],
  imports: [
    CommonModule,
    AcademicGradesRoutingModule,
    CustomMaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AcademicGradesModule { } 