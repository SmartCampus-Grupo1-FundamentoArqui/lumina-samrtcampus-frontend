import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacilitiesListComponent } from './facilities-list/facilities-list.component';
import {SharedModule} from "../../shared/shared.module";
import {FacilitiesRoutingModule} from "./facilities-routing.module";



@NgModule({
    declarations: [
        FacilitiesListComponent
    ],
    exports: [
        FacilitiesListComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        FacilitiesRoutingModule
    ]
})
export class FacilitiesModule { }
