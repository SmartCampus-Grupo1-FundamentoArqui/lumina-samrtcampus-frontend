import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {ClassroomCapacityComponent} from "./classroom-capacity.component";
import {ClassroomCapacityRoutingModule} from "./classroom-capacity-routing.module";
import {MatToolbarModule} from "@angular/material/toolbar";



@NgModule({
    declarations: [
        ClassroomCapacityComponent
    ],
    imports: [
        CommonModule,
        MatIconModule,
        MatTableModule,
        ClassroomCapacityRoutingModule,
        MatToolbarModule
    ]
})
export class ClassroomCapacityModule { }
