import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AcademicGradesRoutingModule } from './academic-grades-routing.module';
import { AcademicGradesListComponent } from './academic-grades-list/academic-grades-list.component';
import { AcademicGradeDialogComponent } from './academic-grade-dialog/academic-grade-dialog.component';

import { CustomMaterialModule } from '../../custom-material/custom-material.module';
import { SharedModule } from 'src/app/shared/shared.module';

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
    FormsModule,
    SharedModule
  ]
})
export class AcademicGradesModule { } 