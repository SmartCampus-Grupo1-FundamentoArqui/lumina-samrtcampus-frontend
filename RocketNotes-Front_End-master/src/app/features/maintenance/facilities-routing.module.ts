import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {LayoutComponent} from "../../shared/layout/layout.component";

import {FacilitiesListComponent} from "./facilities-list/facilities-list.component";
const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {path: '', component:FacilitiesListComponent},
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class FacilitiesRoutingModule{}