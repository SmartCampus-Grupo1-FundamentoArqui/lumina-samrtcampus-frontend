import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentComponent } from './equipment-list/equipment.component';
import {SharedModule} from "../../shared/shared.module";
import {EquipmentRoutingModule} from "./equipment-routing.module";
import {FacilitiesModule} from "../maintenance/facilities.module";
import { EquipmentDialogComponent } from './equipment-dialog/equipment-dialog.component';



@NgModule({
  declarations: [
    EquipmentComponent,
    EquipmentDialogComponent
  ],
  exports:[
    EquipmentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EquipmentRoutingModule,
    FacilitiesModule
  ]
})
export class EquipmentModule { }
