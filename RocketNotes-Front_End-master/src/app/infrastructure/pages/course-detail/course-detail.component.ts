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
}
