import {Component, EventEmitter, Input, Output, ViewChild, OnInit} from '@angular/core';
import {Classroom} from "../../model/classroom.entity";
import {NgForm} from "@angular/forms";
import {Course} from "../../model/course.entity";
import {AcademicGradesService, AcademicGrade} from "../../../core/services/academic-grades.service";
import {TeacherService} from "../../../features/teacher/service/teacher.service";

@Component({
  selector: 'app-course-create-form',
  templateUrl: './course-create-form.component.html',

  styleUrls: ['./course-create-form.component.css']

})
export class CourseCreateFormComponent implements OnInit {
  @Input() course: Course;
  @Input() editMode = false;
  @Output() courseAdded = new EventEmitter<Course>();
  @Output() courseUpdated = new EventEmitter<Course>();
  @Output() editCanceled = new EventEmitter();
  @ViewChild('courseForm', { static: false}) courseForm!: NgForm;

  academicGrades: AcademicGrade[] = [];
  teachers: any[] = [];

  // Methods

  constructor(
    private academicGradesService: AcademicGradesService,
    private teacherService: TeacherService
  ) {
    this.course = {} as Course;
  }

  ngOnInit(): void {
    this.loadAcademicGrades();
    this.loadTeachers();
  }

  loadAcademicGrades(): void {
    this.academicGradesService.getAll().subscribe({
      next: (grades) => {
        this.academicGrades = grades;
      },
      error: (error) => {
        console.error('Error loading academic grades:', error);
      }
    });
  }

  loadTeachers(): void {
    this.teacherService.getAll().subscribe({
      next: (teachers) => {
        this.teachers = teachers;
      },
      error: (error) => {
        console.error('Error loading teachers:', error);
      }
    });
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
