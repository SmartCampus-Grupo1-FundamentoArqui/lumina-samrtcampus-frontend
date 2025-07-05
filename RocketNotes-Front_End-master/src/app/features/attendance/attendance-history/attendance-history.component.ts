import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AttendanceService, AttendanceSession } from '../services/attendance.service';
import { CoursesService } from '../../../infrastructure/services/courses.service';
import { Course } from '../../../infrastructure/model/course.entity';

@Component({
  selector: 'app-attendance-history',
  templateUrl: './attendance-history.component.html',
  styleUrls: ['./attendance-history.component.css']
})
export class AttendanceHistoryComponent implements OnInit {
  historyForm: FormGroup;
  courses: Course[] = [];
  attendanceSessions: AttendanceSession[] = [];
  displayedColumns: string[] = ['date', 'dayOfWeek', 'presentCount', 'absentCount', 'lateCount'];

  constructor(
    private fb: FormBuilder,
    private attendanceService: AttendanceService,
    private coursesService: CoursesService
  ) {
    this.historyForm = this.fb.group({
      courseId: ['', Validators.required],
      week: ['', [Validators.required, Validators.min(1), Validators.max(52)]]
    });
  }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.coursesService.getAll().subscribe({
      next: (courses: Course[]) => {
        this.courses = courses;
      },
      error: (error) => console.error('Error loading courses:', error)
    });
  }

  searchHistory(): void {
    if (this.historyForm.valid) {
      const { courseId, week } = this.historyForm.value;
      
      this.attendanceService.getHistoryByCourseAndWeek(courseId, week).subscribe({
        next: (sessions) => {
          this.attendanceSessions = sessions;
        },
        error: (error) => {
          console.error('Error loading attendance history:', error);
        }
      });
    }
  }

  getPresentCount(session: AttendanceSession): number {
    return session.studentAttendances.filter(attendance => 
      attendance.status === 'PRESENT'
    ).length;
  }

  getAbsentCount(session: AttendanceSession): number {
    return session.studentAttendances.filter(attendance => 
      attendance.status === 'ABSENT'
    ).length;
  }

  getLateCount(session: AttendanceSession): number {
    return session.studentAttendances.filter(attendance => 
      attendance.status === 'LATE'
    ).length;
  }
}
