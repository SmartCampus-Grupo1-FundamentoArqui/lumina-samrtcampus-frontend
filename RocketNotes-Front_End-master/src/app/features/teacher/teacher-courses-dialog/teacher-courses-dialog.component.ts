import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../../../infrastructure/model/course.entity';
import { CoursesService } from '../../../infrastructure/services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-teacher-courses-dialog',
  templateUrl: './teacher-courses-dialog.component.html',
  styleUrls: ['./teacher-courses-dialog.component.css']
})
export class TeacherCoursesDialogComponent implements OnInit {
  loadingAssign: number | null = null;
  allCourses: Course[] = [];
  showAll: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<TeacherCoursesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { teacherName: string, courses: Course[], teacherId: number },
    private coursesService: CoursesService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.coursesService.getAll().subscribe({
      next: (courses) => {
        this.allCourses = courses;
      }
    });
  }

  assignTeacher(courseId: number | undefined) {
    if (typeof courseId !== 'number') {
      this.snackBar.open('ID de curso inválido', 'Cerrar', { duration: 2000 });
      return;
    }
    this.loadingAssign = courseId;
    this.coursesService.assignTeacherToCourse(courseId, this.data.teacherId).subscribe({
      next: () => {
        this.snackBar.open('Profesor asignado correctamente', 'Cerrar', { duration: 2000 });
        this.loadingAssign = null;
      },
      error: () => {
        this.snackBar.open('Error al asignar profesor', 'Cerrar', { duration: 2000 });
        this.loadingAssign = null;
      }
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  showAllCourses() {
    this.showAll = true;
  }

  hideAllCourses() {
    this.showAll = false;
  }
}