import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ClassroomsService } from '../../../infrastructure/services/classrooms.service';
import { Classroom } from '../../../infrastructure/model/classroom.entity';

export interface Student {
  classroom_id: number;
  dni: string;
  first_name: string;
  last_name_father: string;
  last_name_mother: string;
}

export interface Parent {
  dni: string;
  email: string;
  first_name: string;
  last_name_father: string;
  last_name_mother: string;
  phone: string;
}

export interface StudentRegistration {
  student: Student;
  parent: Parent;
}

@Component({
  selector: 'app-dialog-student',
  templateUrl: './dialog-student.component.html',
  styleUrls: ['./dialog-student.component.css']
})
export class DialogStudentComponent implements OnInit {
  currentStep = 1;
  studentForm: FormGroup;
  parentForm: FormGroup;
  classrooms: Classroom[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StudentRegistration,
    private fb: FormBuilder,
    private classroomsService: ClassroomsService
  ) {
    this.studentForm = this.fb.group({
      classroom_id: ['', [Validators.required]],
      dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      first_name: ['', [Validators.required]],
      last_name_father: ['', [Validators.required]],
      last_name_mother: ['', [Validators.required]]
    });

    this.parentForm = this.fb.group({
      dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', [Validators.required]],
      last_name_father: ['', [Validators.required]],
      last_name_mother: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  nextStep(): void {
    if (this.studentForm.valid) {
      this.currentStep = 2;
    }
  }

  previousStep(): void {
    this.currentStep = 1;
  }

  onSubmit(): void {
    if (this.studentForm.valid && this.parentForm.valid) {
      const result: StudentRegistration = {
        student: this.studentForm.value,
        parent: this.parentForm.value
      };
      this.dialogRef.close(result);
    }
  }

  ngOnInit(): void {
    // Cargar la lista de aulas
    this.classroomsService.getAll().subscribe({
      next: (classrooms) => {
        this.classrooms = classrooms;
      },
      error: (error) => {
        console.error('Error loading classrooms:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    });

    if (this.data) {
      if (this.data.student) {
        this.studentForm.patchValue(this.data.student);
      }
      if (this.data.parent) {
        this.parentForm.patchValue(this.data.parent);
      }
    }
  }
}
