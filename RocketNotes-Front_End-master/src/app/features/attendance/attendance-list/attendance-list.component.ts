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
  coursesMap: { [id: string]: string } = {};
  classroomsMap: { [id: string]: string } = {};

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
    console.log('Usuario autenticado:', this.currentUser);
    if (this.currentUser.role && this.currentUser.role.toLowerCase() === 'teacher' && isNaN(Number(this.currentUser.id))) {
      this.teacherService.getAll().subscribe(teachers => {
        console.log('Lista de profesores:', teachers);
        // Normalizar emails para comparación
        const userEmail = (this.currentUser.email || this.currentUser.id || '').trim().toLowerCase();
        const found = teachers.find(t => (t.email || '').trim().toLowerCase() === userEmail);
        if (found) {
          console.log('Profesor encontrado:', found);
          this.currentUser.id = found.id;
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
          this.loadAttendanceSessions();
        } else {
          console.error('No se encontró el profesor con email:', userEmail);
          this.showMessage('No se encontró el profesor con el email actual');
        }
      }, err => {
        console.error('Error al obtener profesores:', err);
        if (err && err.error) {
          console.error('Detalle del error:', err.error);
        }
        this.showMessage('Error al obtener la lista de profesores');
      });
    } else {
      this.loadAttendanceSessions();
    }
    this.coursesService.getAll().subscribe(courses => {
      this.coursesMap = {};
      for (const c of courses) {
        this.coursesMap[String(c.id)] = c.name;
      }
    });
    this.classroomsService.getAll().subscribe(classrooms => {
      this.classroomsMap = {};
      for (const cl of classrooms) {
        this.classroomsMap[String(cl.id)] = `${cl.section} - ${cl.roomNumber}`;
      }
    });
  }

  loadAttendanceSessions(): void {
    // Siempre cargar solo las sesiones del profesor autenticado
    this.attendanceService.getSessionsByTeacher(this.currentUser.id).subscribe({
      next: (sessions) => {
        console.log('Sesiones de asistencia recibidas:', sessions);
        this.attendanceSessions = sessions;
      },
      error: (error) => {
        console.error('Error loading attendance sessions:', error);
        this.showMessage('Error al cargar las sesiones de asistencia');
      }
    });
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

  getCourseName(courseId: string | number): string {
    return this.coursesMap[String(courseId)] || `ID: ${courseId}`;
  }
  getClassroomName(classroomId: string | number): string {
    return this.classroomsMap[String(classroomId)] || `ID: ${classroomId}`;
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }
}
