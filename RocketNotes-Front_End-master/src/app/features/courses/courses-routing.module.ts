import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CourseDetailComponent } from 'src/app/infrastructure/pages/course-detail/course-detail.component';
import { CourseGradebookComponent } from 'src/app/infrastructure/pages/course-gradebook/course-gradebook.component';

import { CoursesWrapperComponent } from './courses-wrapper.component';
const routes: Routes = [
  {
    path: '',
    component: CoursesWrapperComponent,
    children: [
      { path: '', component: CoursesComponent },
      { path: 'detail/:id', component: CourseDetailComponent },
      { path: 'gradebook/:id', component: CourseGradebookComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
