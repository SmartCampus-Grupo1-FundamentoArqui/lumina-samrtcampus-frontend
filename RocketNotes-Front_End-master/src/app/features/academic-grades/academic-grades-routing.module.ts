import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcademicGradesListComponent } from './academic-grades-list/academic-grades-list.component';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: AcademicGradesListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcademicGradesRoutingModule { } 