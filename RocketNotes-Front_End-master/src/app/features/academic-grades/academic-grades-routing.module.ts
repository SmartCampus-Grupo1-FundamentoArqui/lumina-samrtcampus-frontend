import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcademicGradesListComponent } from './academic-grades-list/academic-grades-list.component';

const routes: Routes = [
  {
    path: '',
    component: AcademicGradesListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcademicGradesRoutingModule { } 