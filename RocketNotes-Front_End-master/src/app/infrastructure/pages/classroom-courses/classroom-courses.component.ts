import {Component, OnInit} from '@angular/core';
import {Classroom} from "../../model/classroom.entity";
import {ClassroomsService} from "../../services/classrooms.service";
import {StudentsService, Student} from "../../services/students.service";
import {ClassroomStudentCountMap} from "../../model/classroom-student-count-map";
import { Router } from '@angular/router';

@Component({
  selector: 'app-classroom-courses',
  templateUrl: './classroom-courses.component.html',

  styleUrls: ['./classroom-courses.component.css']

})
export class ClassroomCoursesComponent implements OnInit {
  classrooms: Classroom[] = [];
  studentCountMap: ClassroomStudentCountMap = {};
  displayedColumns: string[] = ['id', 'section', 'classroom', 'enrolled_students', 'addStudent'];

  constructor(
    private classroomService: ClassroomsService,
    private studentsService: StudentsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.classroomService.getAll().subscribe({
      next: (data: any) => {
        this.classrooms = data;
        this.loadStudentCounts();
      },
      error: (err: any) => console.error(err)
    });
  }

  loadStudentCounts() {
    this.studentsService.getAll().subscribe({
      next: (students: Student[]) => {
        const countMap: ClassroomStudentCountMap = {};
        students.forEach(student => {
          if (student.classroomId) {
            countMap[student.classroomId] = (countMap[student.classroomId] || 0) + 1;
          }
        });
        this.studentCountMap = countMap;
      },
      error: (err) => {
        console.error('Error loading students for classroom count:', err);
      }
    });
  }

  getEnrolledCount(classroom: Classroom): number {
    return this.studentCountMap[classroom.id] || 0;
  }

  goToCoursesView(classroom: Classroom) {
    this.router.navigate(['classroom-courses/courses-view', classroom.id]);
  }

}
