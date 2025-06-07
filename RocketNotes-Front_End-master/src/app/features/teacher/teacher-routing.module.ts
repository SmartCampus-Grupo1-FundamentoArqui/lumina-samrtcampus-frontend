import {NgModule} from "@angular/core";

import {Routes, RouterModule} from "@angular/router";
import {LayoutComponent} from "../../shared/layout/layout.component";
import {TeachersComponent} from "./teachers/teachers.component";


const routes: Routes =[
    {
        path:'',
        component: LayoutComponent,
        children:[
            {path:'', component: TeachersComponent},
        ]
    }
];
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class TeacherRoutingModule{
}