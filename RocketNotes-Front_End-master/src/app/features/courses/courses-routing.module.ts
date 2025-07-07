import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';

import { CoursesWrapperComponent } from './courses-wrapper.component';
const routes: Routes = [
  {
    path: '',
    component: CoursesWrapperComponent,
    children: [
      { path: '', component: CoursesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
