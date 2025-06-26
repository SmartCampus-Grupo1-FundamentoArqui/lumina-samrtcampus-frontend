import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateFacilityDto } from '../service/facilitie.service';

@Component({
  selector: 'app-facilitie-dialog',
  templateUrl: './facilitie-dialog.component.html',
  styleUrls: ['./facilitie-dialog.component.css']
})
export class FacilitieDialogComponent {
  facilityForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FacilitieDialogComponent>
  ) {
    this.facilityForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      budget: [0, [Validators.required, Validators.min(0)]],
      period: [0, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(): void {
    if (this.facilityForm.valid) {
      const facilityData: CreateFacilityDto = this.facilityForm.value;
      this.dialogRef.close(facilityData);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
