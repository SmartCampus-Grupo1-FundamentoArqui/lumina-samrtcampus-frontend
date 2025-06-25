import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Student} from "../../model/student.entity";
import {NgForm} from "@angular/forms";
import {Classroom as ClassroomEntity} from "../../model/classroom.entity";
import {ClassroomsService, Classroom} from "../../services/classrooms.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-classroom-create-form',
  templateUrl: './classroom-create-form.component.html',

  styleUrls: ['./classroom-create-form.component.css']

})

export class ClassroomCreateFormComponent {
  @Input() classroom: ClassroomEntity;
  @Input() editMode = false;
  @Output() studentAdded = new EventEmitter<Classroom>();
  @Output() studentUpdated = new EventEmitter<Classroom>();
  @Output() editCanceled = new EventEmitter();
  @ViewChild('studentForm', { static: false}) studentForm!: NgForm;

  // Methods

  constructor(
    private classroomsService: ClassroomsService,
    private dialogRef: MatDialogRef<ClassroomCreateFormComponent>
  ) {
    this.classroom = {} as ClassroomEntity;
  }

  // Private Methods

  private resetEditState() {
    this.editMode = false;
    this.studentForm.resetForm();
    this.classroom = {} as ClassroomEntity;
  }

  // Event Handlers

  onSubmit() {
    if (this.studentForm.form.valid) {
      if (this.editMode) {
        this.updateClassroom();
      } else {
        this.createClassroom();
      }
    } else {
      console.log('invalid data');
    }
  }

  private createClassroom() {
    const newClassroom = {
      name: this.classroom.classroom,
      capacity: this.classroom.capacity,
      type: 'Aula',
      location: 'Campus'
    };

    this.classroomsService.create(newClassroom).subscribe({
      next: (response) => {
        console.log('Aula creada exitosamente:', response);
        this.studentAdded.emit(response);
        this.dialogRef.close(response);
      },
      error: (error) => {
        console.error('Error creando aula:', error);
      }
    });
  }

  private updateClassroom() {
    if (this.classroom.id) {
      const updatedClassroom = {
        name: this.classroom.classroom,
        capacity: this.classroom.capacity,
        type: 'Aula',
        location: 'Campus'
      };
      
      this.classroomsService.update(this.classroom.id.toString(), updatedClassroom).subscribe({
        next: (response) => {
          console.log('Aula actualizada exitosamente:', response);
          this.studentUpdated.emit(response);
          this.dialogRef.close(response);
        },
        error: (error) => {
          console.error('Error actualizando aula:', error);
        }
      });
    }
  }

  onCancel() {
    this.resetEditState();
    this.editCanceled.emit();
  }

}

