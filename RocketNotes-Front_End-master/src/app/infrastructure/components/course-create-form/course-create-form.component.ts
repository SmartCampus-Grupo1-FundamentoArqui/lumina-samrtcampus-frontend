import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Classroom} from "../../model/classroom.entity";
import {NgForm} from "@angular/forms";
import {Course} from "../../model/course.entity";

@Component({
  selector: 'app-course-create-form',
  templateUrl: './course-create-form.component.html',

  styleUrls: ['./course-create-form.component.css']

})
export class CourseCreateFormComponent {
  @Input() course: Course;
  @Input() editMode = false;
  @Output() courseAdded = new EventEmitter<Course>();
  @Output() courseUpdated = new EventEmitter<Course>();
  @Output() editCanceled = new EventEmitter();
  @ViewChild('courseForm', { static: false}) courseForm!: NgForm;

  // Methods

  constructor() {
    this.course = {} as Course;
  }

  // Private Methods

  private resetEditState() {
    this.editMode = false;
    this.courseForm.resetForm();
    this.course = {} as Course;
  }

  // Event Handlers

  onSubmit() {
    if (this.courseForm.form.valid) {
      if (this.editMode) {
        this.courseUpdated.emit(this.course);
      } else {
        this.courseAdded.emit(this.course);
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
