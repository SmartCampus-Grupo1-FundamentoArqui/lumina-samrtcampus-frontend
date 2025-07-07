import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesComponent } from './courses.component';
import { CoursesWrapperComponent } from './courses-wrapper.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CoursesRoutingModule } from './courses-routing.module';

@NgModule({
  declarations: [CoursesComponent, CoursesWrapperComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    CoursesRoutingModule,
    SharedModule
  ]
})
export class CoursesModule { }
