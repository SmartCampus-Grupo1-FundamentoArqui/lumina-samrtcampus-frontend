import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ClassroomsService } from '../../../infrastructure/services/classrooms.service';
import { Classroom } from '../../../infrastructure/model/classroom.entity';

export interface Student {
  classroomId: number;
  dni: string;
  firstName: string;
  lastNameFather: string;
  lastNameMother: string;
}

export interface Parent {
  dni: string;
  email: string;
  firstName: string;
  lastNameFather: string;
  lastNameMother: string;
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
      classroomId: ['', [Validators.required]],
      dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      firstName: ['', [Validators.required]],
      lastNameFather: ['', [Validators.required]],
      lastNameMother: ['', [Validators.required]]
    });

    this.parentForm = this.fb.group({
      dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastNameFather: ['', [Validators.required]],
      lastNameMother: ['', [Validators.required]],
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
      // Obtener el classroom seleccionado para validar disponibilidad
      const classroomId = this.studentForm.get('classroomId')?.value;
      const selectedClassroom = this.classrooms.find(c => c.id === classroomId);
      
      if (selectedClassroom && selectedClassroom.currentSize >= selectedClassroom.capacity) {
        alert('The selected classroom is full. Please choose another classroom.');
        return;
      }

      // Crear objeto estudiante con todos los campos requeridos
      const student = {
        classroomId: this.studentForm.get('classroomId')?.value,
        dni: this.studentForm.get('dni')?.value,
        firstName: this.studentForm.get('firstName')?.value,
        lastNameFather: this.studentForm.get('lastNameFather')?.value,
        lastNameMother: this.studentForm.get('lastNameMother')?.value
      };

      // Crear objeto padre con todos los campos requeridos
      const parent = {
        dni: this.parentForm.get('dni')?.value,
        email: this.parentForm.get('email')?.value,
        firstName: this.parentForm.get('firstName')?.value,
        lastNameFather: this.parentForm.get('lastNameFather')?.value,
        lastNameMother: this.parentForm.get('lastNameMother')?.value,
        phone: this.parentForm.get('phone')?.value
      };

      // Validar que ningún campo sea null antes de cerrar el diálogo
      if (Object.values(student).some(value => value === null || value === '') || 
          Object.values(parent).some(value => value === null || value === '')) {
        console.error('Some fields are null or empty:', { student, parent });
        return;
      }

      this.dialogRef.close({
        student,
        parent
      });
    } else {
      // Marcar todos los campos como touched para mostrar los errores
      if (this.currentStep === 1) {
        Object.keys(this.studentForm.controls).forEach(key => {
          const control = this.studentForm.get(key);
          control?.markAsTouched();
        });
      } else {
        Object.keys(this.parentForm.controls).forEach(key => {
          const control = this.parentForm.get(key);
          control?.markAsTouched();
        });
      }
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
