import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AttendanceRoutingModule } from './././attendance-routing.module';
import { AttendanceListComponent } from './attendance-list/attendance-list.component';
import { AttendanceCreateDialogComponent } from './attendance-create-dialog/attendance-create-dialog.component';
import { AttendanceHistoryComponent } from './attendance-history/attendance-history.component';
import { SharedModule } from '../../shared/shared.module';
import { SendMailDialogComponent } from './send-mail-dialog/send-mail-dialog.component';

@NgModule({
  declarations: [
    AttendanceListComponent,
    AttendanceCreateDialogComponent,
    AttendanceHistoryComponent,
    SendMailDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    AttendanceRoutingModule
  ],
  entryComponents: [SendMailDialogComponent],
})
export class AttendanceModule { }
