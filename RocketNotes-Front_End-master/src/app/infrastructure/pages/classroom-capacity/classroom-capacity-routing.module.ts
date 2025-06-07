import {NgModule} from "@angular/core";

import {Routes, RouterModule} from "@angular/router";
import {LayoutComponent} from "../../../shared/layout/layout.component";
import {ClassroomCapacityComponent} from "./classroom-capacity.component";


const routes: Routes =[
    {
        path:'',
        component: LayoutComponent,
        children:[
            {path:'', component: ClassroomCapacityComponent},
        ]
    }
];
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class ClassroomCapacityRoutingModule{
}