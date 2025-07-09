import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Course} from "../../model/course.entity";
import {CoursesService} from "../../services/courses.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import {CourseCreateFormComponent} from "../../components/course-create-form/course-create-form.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses-view',
  templateUrl: './courses-view.component.html',
  styleUrls: ['./courses-view.component.css']
})
export class CoursesViewComponent implements OnInit {
  courses: Course[] = [];
  classroomId: number | null = null;
  displayedColumns: string[] = ['course', 'teacher', 'image_url'];

  constructor(private courseService: CoursesService, private router: Router, public dialog: MatDialog, private route: ActivatedRoute) {
  }

  ngOnInit() {
    console.log('CoursesViewComponent cargado');
    this.route.paramMap.subscribe(params => {
      const classroomIdParam = params.get('classroomId');
      this.classroomId = classroomIdParam ? +classroomIdParam : null;
      this.loadCourses();
    });
  }

  loadCourses() {
    this.courseService.getAll().subscribe({
      next: (data: any) => {
        if (this.classroomId) {
          this.courses = data.filter((course: Course) => course.classroomId === this.classroomId);
        } else {
          this.courses = data;
        }
      },
      error: (err) => console.error(err)
    });
  }
  viewCourseDetails(course: Course) {
    this.router.navigate(['/course-detail', course.id]);
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef: MatDialogRef<CourseCreateFormComponent> = this.dialog.open(CourseCreateFormComponent, {
      width: '550px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { classroomId: this.classroomId }
    });
    dialogRef.componentInstance.courseAdded.subscribe((newCourse: Course) => {
      this.loadCourses();
    });
  }
  viewCourse(course: Course) {
    this.router.navigate(['/course-detail', course.id]);
  }

  editCourse(course: Course) {
    const dialogRef: MatDialogRef<CourseCreateFormComponent> = this.dialog.open(CourseCreateFormComponent, {
      width: '550px',
      data: { ...course, editMode: true }
    });
    dialogRef.componentInstance.courseUpdated.subscribe((updatedCourse: Course) => {
      this.loadCourses();
    });
  }

  deleteCourse(course: Course) {
    if (confirm(`¿Estás seguro de que deseas eliminar el curso "${course.name}"?`)) {
      this.courseService.delete(course.id!.toString()).subscribe({
        next: () => this.loadCourses(),
        error: (err) => alert('Error eliminando el curso: ' + (err?.error?.message || err.message || err))
      });
    }
  }
}
