import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatToolbarModule} from "@angular/material/toolbar";
import {ClassroomCoursesComponent} from "./classroom-courses.component";
import {ClassroomCoursesRoutingModule} from "./classroom-courses-routing.module";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
    declarations: [
        ClassroomCoursesComponent
    ],
    imports: [
        CommonModule,
        MatIconModule,
        MatTableModule,
        ClassroomCoursesRoutingModule,
        MatToolbarModule,
        MatGridListModule,
        MatCardModule,
        MatButtonModule
    ]
})
export class ClassroomCoursesModule { }
