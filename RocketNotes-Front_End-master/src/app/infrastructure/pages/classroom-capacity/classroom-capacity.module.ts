import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ClassroomCapacityComponent } from "./classroom-capacity.component";
import { ClassroomCapacityRoutingModule } from "./classroom-capacity-routing.module";
import { MatToolbarModule } from "@angular/material/toolbar";

@NgModule({
    declarations: [
        ClassroomCapacityComponent
    ],
    imports: [
        CommonModule,
        MatIconModule,
        MatTableModule,
        MatButtonModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        ClassroomCapacityRoutingModule,
        MatToolbarModule
    ]
})
export class ClassroomCapacityModule { }
