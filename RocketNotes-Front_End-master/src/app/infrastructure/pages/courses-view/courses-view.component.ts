import {Component, OnInit} from '@angular/core';
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
  displayedColumns: string[] = ['course', 'teacher', 'image_url'];

  constructor(private courseService: CoursesService, private router: Router, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.courseService.getAll().subscribe({
      next: (data:any ) => {
        this.courses = data;
      },
      error: (err) => console.error(err)
    });
  }
  viewCourseDetails(course: Course) {

    this.router.navigate(['courses-view/course-detail', course.id]);
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef: MatDialogRef<CourseCreateFormComponent> = this.dialog.open(CourseCreateFormComponent, {
      width: '550px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.componentInstance.courseAdded.subscribe((newCourse: Course) => {
      this.courses.push(newCourse);
    });
  }
  viewCourse(course: Course) {
    this.router.navigate(['/course-detail', course.id]);
  }
}
