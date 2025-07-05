import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AttendanceRoutingModule } from './././attendance-routing.module';
import { AttendanceListComponent } from './attendance-list/attendance-list.component';
import { AttendanceCreateDialogComponent } from './attendance-create-dialog/attendance-create-dialog.component';
import { AttendanceHistoryComponent } from './attendance-history/attendance-history.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    AttendanceListComponent,
    AttendanceCreateDialogComponent,
    AttendanceHistoryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    AttendanceRoutingModule
  ]
})
export class AttendanceModule { }
