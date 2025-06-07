import {Router, RouterModule, Routes} from "@angular/router";
import {LayoutComponent} from "../../shared/layout/layout.component";
import {ListFacilitiesComponent} from "./list-facilities/list-facilities.component";
import {NgModule} from "@angular/core";


const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children:[
            {
                path:'',component: ListFacilitiesComponent
            },
        ]
    }
];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class FacilitieRoutingModule{ }