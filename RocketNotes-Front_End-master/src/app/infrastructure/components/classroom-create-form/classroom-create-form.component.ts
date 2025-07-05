import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClassroomsService, ClassroomRequest } from '../../services/classrooms.service';
import { AcademicGradesService, AcademicGrade } from '../../../core/services/academic-grades.service';
import { Classroom } from '../../model/classroom.entity';

@Component({
  selector: 'app-classroom-create-form',
  templateUrl: './classroom-create-form.component.html',
  styleUrls: ['./classroom-create-form.component.css']
})
export class ClassroomCreateFormComponent implements OnInit {
  @Input() classroom?: Classroom;
  @Input() editMode = false;
  @Output() classroomAdded = new EventEmitter<Classroom>();
  @Output() classroomUpdated = new EventEmitter<Classroom>();
  @Output() editCanceled = new EventEmitter<void>();
  @ViewChild('classroomForm', { static: false }) formDirective!: NgForm;

  classroomForm: FormGroup;
  grades: AcademicGrade[] = [];
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ClassroomCreateFormComponent>,
    private classroomsService: ClassroomsService,
    private academicGradesService: AcademicGradesService,
    private snackBar: MatSnackBar
  ) {
    this.classroomForm = this.formBuilder.group({
      section: ['', [Validators.required]],
      roomNumber: ['', [Validators.required]],
      capacity: ['', [Validators.required, Validators.min(1)]],
      gradeId: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadGrades();
    if (this.editMode && this.classroom) {
      this.classroomForm.patchValue({
        section: this.classroom.section,
        roomNumber: this.classroom.roomNumber,
        capacity: this.classroom.capacity,
        gradeId: this.classroom.grade?.id || ''
      });
    }
  }

  loadGrades() {
    this.academicGradesService.getAll().subscribe({
      next: (grades) => {
        this.grades = grades;
      },
      error: (error: Error) => {
        console.error('Error loading grades:', error);
        this.snackBar.open('Error loading grades', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }
    });
  }

  onSubmit() {
    if (this.classroomForm.valid) {
      this.isLoading = true;
      
      const formValues = this.classroomForm.value;
      console.log('Form values:', formValues);
      
      const classroomRequest: ClassroomRequest = {
        section: formValues.section,
        roomNumber: formValues.roomNumber,
        capacity: Number(formValues.capacity),
        gradeId: Number(formValues.gradeId)
      };
      
      console.log('Classroom request:', classroomRequest);

      const request$ = this.editMode && this.classroom 
        ? this.classroomsService.update(String(this.classroom.id), classroomRequest)
        : this.classroomsService.create(classroomRequest);

      request$.subscribe({
        next: (classroom: Classroom) => {
          console.log('Classroom operation successful:', classroom);
          this.snackBar.open(
            this.editMode ? 'Classroom updated successfully' : 'Classroom created successfully', 
            'Close',
            {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            }
          );
          if (this.editMode) {
            this.classroomUpdated.emit(classroom);
          } else {
            this.classroomAdded.emit(classroom);
          }
          this.dialogRef.close(classroom);
        },
        error: (error: any) => {
          console.error('Error with classroom operation:', error);
          const errorMessage = error.error?.message || error.message || 'Unknown error occurred';
          this.snackBar.open(
            `Error ${this.editMode ? 'updating' : 'creating'} classroom: ${errorMessage}`, 
            'Close',
            {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            }
          );
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    } else {
      console.log('Form is invalid:', this.classroomForm.errors);
      Object.keys(this.classroomForm.controls).forEach(key => {
        const control = this.classroomForm.get(key);
        if (control?.invalid) {
          console.log(`${key} is invalid:`, control.errors);
          control.markAsTouched();
        }
      });
    }
  }

  onCancel() {
    this.editCanceled.emit();
    this.dialogRef.close();
  }
}

