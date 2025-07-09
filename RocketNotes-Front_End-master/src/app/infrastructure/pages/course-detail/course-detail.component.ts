import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from "../../model/course.entity";
import { CoursesService } from "../../services/courses.service";
@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  course: Course | undefined;

  constructor(private route: ActivatedRoute,private router: Router, private courseService: CoursesService) { }

  isTeacher(): boolean {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user && user.role && user.role.toLowerCase() === 'teacher';
  }

  ngOnInit() {
    const courseId = this.route.snapshot.paramMap.get('id');
    if (courseId) {
      this.courseService.getCourseById(courseId).subscribe({
        next: (data) => {
          this.course = data;
        },
        error: (err: any) => console.error(err)
      });
    }
  }
  goToDetailCoursesView() {
    this.router.navigate(['course-detail/course-detail']);
  }
  goToGradebook() {
    if (this.course && this.course.id) {
      this.router.navigate(['../../gradebook', this.course.id], { relativeTo: this.route });
    }
  }
  goToViewNotas() {
    if (this.course && this.course.id) {
      this.router.navigate(['../../gradebook', this.course.id, { view: true }], { relativeTo: this.route });
    }
  }
}
