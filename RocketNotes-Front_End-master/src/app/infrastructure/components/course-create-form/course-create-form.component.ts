import {Component, EventEmitter, Input, Output, ViewChild, OnInit, Inject, Optional, ChangeDetectorRef} from '@angular/core';
import {Classroom} from "../../model/classroom.entity";
import {NgForm} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Course} from "../../model/course.entity";
import {AcademicGradesService, AcademicGrade} from "../../../core/services/academic-grades.service";
import {ClassroomsService} from "../../services/classrooms.service";
import {TeacherService} from "../../../features/teacher/service/teacher.service";
import {CoursesService} from '../../services/courses.service';
import { ScheduleService } from '../../../core/services/schedule.service';

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
  classrooms: Classroom[] = [];
  teachers: any[] = [];

  // Methods

  constructor(
    private academicGradesService: AcademicGradesService,
    private teacherService: TeacherService,
    private classroomsService: ClassroomsService,
    private coursesService: CoursesService,
    private scheduleService: ScheduleService,
    private cdr: ChangeDetectorRef,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    @Optional() public dialogRef?: MatDialogRef<CourseCreateFormComponent>
  ) {
    // Inicializa el formulario correctamente para edición o creación
    if (data && data.editMode) {
      this.editMode = true;
      this.course = { ...data };
      delete (this.course as any).editMode;
    } else if (data && data.classroomId) {
      this.course = { classroomId: data.classroomId } as Course;
    } else {
      this.course = {} as Course;
    }
  }

  ngOnInit(): void {
    this.loadAcademicGrades();
    this.loadTeachers();
    this.loadClassrooms();
    // Forzar actualización para evitar ExpressionChangedAfterItHasBeenCheckedError
    this.cdr.detectChanges();
  }
  loadClassrooms(): void {
    this.classroomsService.getAll().subscribe({
      next: (classrooms) => {
        this.classrooms = classrooms;
      },
      error: (error) => {
        console.error('Error loading classrooms:', error);
      }
    });
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

  onSubmit(): void {
    if (!this.course.name || !this.course.classroomId || !this.course.schedule) {
      return;
    }
    if (this.editMode) {
      this.coursesService.update(String(this.course.id), this.course).subscribe({
        next: (updatedCourse) => {
          this.courseUpdated.emit(updatedCourse);
          if (this.dialogRef) {
            this.dialogRef.close();
          }
          this.resetEditState();
        },
        error: (err) => {
          console.error('Error actualizando curso:', err);
        }
      });
    } else {
      this.coursesService.create(this.course).subscribe({
        next: (createdCourse) => {
          // Parseo simple del horario: "Lun-mie 15:30" => dayOfWeek: "Lun-mie", startTime: "15:30"
          let dayOfWeek = '';
          let startTime = '';
          if (this.course.schedule) {
            const parts = this.course.schedule.split(' ');
            if (parts.length === 2) {
              dayOfWeek = parts[0];
              startTime = parts[1];
            }
          }
          this.scheduleService.create({
            teacherId: String(this.course.teacherId),
            schedule: this.course.schedule
          }).subscribe({
            next: () => {},
            error: (err) => { console.error('Error creating schedule:', err); }
          });
          this.courseAdded.emit(createdCourse);
          if (this.dialogRef) {
            this.dialogRef.close();
          }
          this.resetEditState();
        },
        error: (err) => {
          console.error('Error creating course:', err);
        }
      });
    }
  }

  onCancel() {
    this.resetEditState();
    this.editCanceled.emit();
  }
}
