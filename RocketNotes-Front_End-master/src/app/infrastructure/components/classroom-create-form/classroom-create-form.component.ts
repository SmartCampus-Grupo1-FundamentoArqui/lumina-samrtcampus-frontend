import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Student} from "../../model/student.entity";
import {NgForm} from "@angular/forms";
import {Classroom} from "../../model/classroom.entity";

@Component({
  selector: 'app-classroom-create-form',
  templateUrl: './classroom-create-form.component.html',

  styleUrls: ['./classroom-create-form.component.css']

})

export class ClassroomCreateFormComponent {
  @Input() classroom: Classroom;
  @Input() editMode = false;
  @Output() studentAdded = new EventEmitter<Classroom>();
  @Output() studentUpdated = new EventEmitter<Classroom>();
  @Output() editCanceled = new EventEmitter();
  @ViewChild('studentForm', { static: false}) studentForm!: NgForm;

  // Methods

  constructor() {
    this.classroom = {} as Classroom;
  }

  // Private Methods

  private resetEditState() {
    this.editMode = false;
    this.studentForm.resetForm();
    this.classroom = {} as Classroom;
  }

  // Event Handlers

  onSubmit() {
    if (this.studentForm.form.valid) {
      if (this.editMode) {
        this.studentUpdated.emit(this.classroom);
      } else {
        this.studentAdded.emit(this.classroom);
      }
      this.resetEditState();
    } else {
      console.log('invalid data');
    }
  }

  onCancel() {
    this.resetEditState();
    this.editCanceled.emit();
  }

}

