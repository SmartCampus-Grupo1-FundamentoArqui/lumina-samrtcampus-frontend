import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AttendanceService, AttendanceSession, AttendanceStatus } from '../services/attendance.service';
import { StudentsService, Student } from '../../../infrastructure/services/students.service';
import { CoursesService } from '../../../infrastructure/services/courses.service';
import { Course } from '../../../infrastructure/model/course.entity';
import { ClassroomsService } from '../../../infrastructure/services/classrooms.service';
import { Classroom } from '../../../infrastructure/model/classroom.entity';
import { TeacherService, Teacher } from '../../teacher/service/teacher.service';
import { AttendanceCreateDialogComponent } from '../attendance-create-dialog/attendance-create-dialog.component';
import { AuthenticationService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.css']
})
export class AttendanceListComponent implements OnInit {
  attendanceSessions: AttendanceSession[] = [];
  displayedColumns: string[] = ['date', 'course', 'classroom', 'totalStudents', 'presentCount', 'absentCount', 'actions'];
  currentUser: any;

  constructor(
    private attendanceService: AttendanceService,
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    private classroomsService: ClassroomsService,
    private teacherService: TeacherService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadAttendanceSessions();
  }

  loadAttendanceSessions(): void {
    // Si es un profesor, cargar solo sus sesiones
    if (this.currentUser.role === 'teacher') {
      this.attendanceService.getSessionsByTeacher(this.currentUser.id).subscribe({
        next: (sessions) => {
          this.attendanceSessions = sessions;
        },
        error: (error) => {
          console.error('Error loading attendance sessions:', error);
          this.showMessage('Error al cargar las sesiones de asistencia');
        }
      });
    }
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(AttendanceCreateDialogComponent, {
      width: '800px',
      data: { currentUser: this.currentUser }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAttendanceSessions();
        this.showMessage('Sesión de asistencia creada exitosamente');
      }
    });
  }

  editAttendance(session: AttendanceSession): void {
    const dialogRef = this.dialog.open(AttendanceCreateDialogComponent, {
      width: '800px',
      data: { 
        currentUser: this.currentUser,
        session: session,
        isEdit: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAttendanceSessions();
        this.showMessage('Asistencia actualizada exitosamente');
      }
    });
  }

  getPresentCount(session: AttendanceSession): number {
    return session.studentAttendances.filter(attendance => 
      attendance.status === AttendanceStatus.PRESENT
    ).length;
  }

  getAbsentCount(session: AttendanceSession): number {
    return session.studentAttendances.filter(attendance => 
      attendance.status === AttendanceStatus.ABSENT
    ).length;
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }
}
