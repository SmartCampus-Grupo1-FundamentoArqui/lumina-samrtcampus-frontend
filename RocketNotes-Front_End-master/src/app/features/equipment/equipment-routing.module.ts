import {RouterModule, Routes} from "@angular/router";
import {LayoutComponent} from "../../shared/layout/layout.component";
import {NgModule} from "@angular/core";
import {EquipmentComponent} from "./equipment-list/equipment.component";


const routes: Routes =[
    {
        path: '',
        component: LayoutComponent,
        children:[
            {
                path:'', component:EquipmentComponent
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)] ,
    exports: [RouterModule]
    })

export class EquipmentRoutingModule{ }
