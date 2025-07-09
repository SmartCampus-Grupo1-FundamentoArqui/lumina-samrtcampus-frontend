import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClassroomCapacityComponent} from "./infrastructure/pages/classroom-capacity/classroom-capacity.component";
import {ClassroomStudentsComponent} from "./infrastructure/pages/classroom-students/classroom-students.component";
import {ClassroomCoursesComponent} from "./infrastructure/pages/classroom-courses/classroom-courses.component";
import {CoursesViewComponent} from "./infrastructure/pages/courses-view/courses-view.component";
import { CourseGradebookComponent } from './infrastructure/pages/course-gradebook/course-gradebook.component';
import { CourseDetailComponent } from './infrastructure/pages/course-detail/course-detail.component';

import { AuthGuard } from './core/guards/auth.guard';

const appRoutes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
  },

  {
    path: 'classrooms',
    loadChildren: () => import('./features/classrooms/classrooms.module').then(m => m.ClassroomsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'teachers',
    loadChildren:() => import('./features/teacher/teacher.module').then(m => m.TeacherModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'classroom-capacity',
    loadChildren:() => import('./infrastructure/pages/classroom-capacity/classroom-capacity.module').then(m => m.ClassroomCapacityModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'classroom-courses',
    loadChildren:() => import('./infrastructure/pages/classroom-courses/classroom-courses.module').then(m => m.ClassroomCoursesModule),
    canActivate: [AuthGuard]

  },
  {
    path:'students',
    loadChildren:() => import('./features/student/student.module').then(m=>m.StudentModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'attendance',
    loadChildren: () => import('./features/attendance/attendance.module').then(m => m.AttendanceModule),
    canActivate: [AuthGuard]
  },
  {
    path:'facilities-list',
    loadChildren: ()=> import('./features/facilitie/facilitie.module').then(m=>m.FacilitieModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'equipment-list',
    loadChildren: () => import('./features/equipment/equipment.module').then(m => m.EquipmentModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'customers',
    loadChildren: () => import('./features/customers/customers.module').then(m => m.CustomersModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'maintenance',
    loadChildren: () => import('./features/maintenance/facilities.module').then(m => m.FacilitiesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'account',
    loadChildren: () => import('./features/account/account.module').then(m => m.AccountModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'typography',
    loadChildren: () => import('./features/typography/typography.module').then(m => m.TypographyModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'courses',
    loadChildren: () => import('./features/courses/courses.module').then(m => m.CoursesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'course-detail/:id',
    component: CourseDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'course-gradebook/:id',
    component: CourseGradebookComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'about',
    loadChildren: () => import('./features/about/about.module').then(m => m.AboutModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'academic-grades',
    loadChildren: () => import('./features/academic-grades/academic-grades.module').then(m => m.AcademicGradesModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'courses',
    pathMatch: 'full'
  },
  {path:'capacity', component: ClassroomCapacityComponent},
  {path:'students', component: ClassroomStudentsComponent},
  {path:'classrooms', component: ClassroomCoursesComponent},
  {path:'courses', component: CoursesViewComponent},

];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
