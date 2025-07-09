import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/infrastructure/services/courses.service';
import { TeacherService } from 'src/app/infrastructure/services/teacher.service';
import { Course } from 'src/app/infrastructure/model/course.entity';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  loading = true;
  error = '';

  constructor(
    private coursesService: CoursesService,
    private teacherService: TeacherService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('CoursesComponent cargado');
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const email = user.email;
    if (!email) {
      this.error = 'No se encontró un email de usuario autenticado.';
      this.loading = false;
      return;
    }
    this.teacherService.getByEmail(email).subscribe({
      next: (teacher) => {
        if (!teacher.id) {
          this.error = 'No se encontró un ID de profesor para el email autenticado.';
          this.loading = false;
          return;
        }
        this.coursesService.getCoursesByTeacher(Number(teacher.id)).subscribe({
          next: (courses) => {
            this.courses = courses;
            this.loading = false;
          },
          error: (err) => {
            this.error = 'Error loading courses';
            this.loading = false;
          }
        });
      },
      error: (err) => {
        this.error = 'No se pudo obtener el ID del profesor a partir del email.';
        this.loading = false;
      }
    });
  }

  onCourseClick(course: Course) {
    this.router.navigate(['courses/detail', course.id]);
  }
}
