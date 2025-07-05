import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AcademicGrade } from '../../../core/services/academic-grades.service';

export interface DialogData {
  isEdit: boolean;
  grade?: AcademicGrade;
}

@Component({
  selector: 'app-academic-grade-dialog',
  templateUrl: './academic-grade-dialog.component.html',
  styleUrls: ['./academic-grade-dialog.component.css']
})
export class AcademicGradeDialogComponent implements OnInit {

  gradeForm: FormGroup;
  isEdit: boolean;

  levelOptions = [
    { value: 'Primary', label: 'Primaria' },
    { value: 'Secondary', label: 'Secundaria' },
    { value: 'Initial', label: 'Inicial' }
  ];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AcademicGradeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.isEdit = data.isEdit;
    this.gradeForm = this.createForm();
  }

  ngOnInit(): void {
    if (this.isEdit && this.data.grade) {
      this.gradeForm.patchValue(this.data.grade);
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      level: ['', Validators.required]
    });
  }

  onSave(): void {
    if (this.gradeForm.valid) {
      const formValue = this.gradeForm.value;
      const gradeData: AcademicGrade = {
        name: formValue.name,
        level: formValue.level
      };

      if (this.isEdit && this.data.grade?.id) {
        gradeData.id = this.data.grade.id;
      }

      this.dialogRef.close(gradeData);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  getErrorMessage(field: string): string {
    const control = this.gradeForm.get(field);
    
    if (control?.hasError('required')) {
      return 'Este campo es requerido';
    }
    
    if (control?.hasError('minlength')) {
      return 'Mínimo 2 caracteres';
    }
    
    return '';
  }
} 