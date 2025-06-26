import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ListFacilitiesComponent } from './list-facilities/list-facilities.component';
import { FacilitieRoutingModule } from "./facilitie-routing.module";
import { SharedModule } from "../../shared/shared.module";
import { FacilitieDialogComponent } from './facilitie-dialog/facilitie-dialog.component';

@NgModule({
  declarations: [
    ListFacilitiesComponent,
    FacilitieDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FacilitieRoutingModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatSnackBarModule
  ],
  exports: [
    ListFacilitiesComponent
  ]
})
export class FacilitieModule { }
