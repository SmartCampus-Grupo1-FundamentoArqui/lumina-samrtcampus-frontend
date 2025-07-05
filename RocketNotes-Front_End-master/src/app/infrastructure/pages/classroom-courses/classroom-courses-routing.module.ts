import {NgModule} from "@angular/core";

import {Routes, RouterModule} from "@angular/router";
import {LayoutComponent} from "../../../shared/layout/layout.component";
import {ClassroomCoursesComponent} from "./classroom-courses.component";
import { CoursesViewComponent } from '../courses-view/courses-view.component';
import { CourseDetailComponent } from '../course-detail/course-detail.component';


const routes: Routes =[
    {
        path:'',
        component: LayoutComponent,
        children:[
            {path:'', component: ClassroomCoursesComponent},
            {path:'courses-view/:classroomId', component: CoursesViewComponent},
            {path:'course-detail/:id', component: CourseDetailComponent},
        ]
    },
    { path: '', redirectTo: '/classroom-courses', pathMatch: 'full' }
];
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class ClassroomCoursesRoutingModule{
}