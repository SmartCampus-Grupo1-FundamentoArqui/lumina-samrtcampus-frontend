import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { 
  AttendanceService, 
  AttendanceSessionRequest, 
  AttendanceSession,
  StudentAttendanceDTO,
  AttendanceStatus 
} from '../services/attendance.service';
import { StudentsService, Student } from '../../../infrastructure/services/students.service';
import { CoursesService } from '../../../infrastructure/services/courses.service';
import { Course } from '../../../infrastructure/model/course.entity';
import { ClassroomsService } from '../../../infrastructure/services/classrooms.service';
import { Classroom } from '../../../infrastructure/model/classroom.entity';
import { TeacherService } from '../../teacher/service/teacher.service';
import { MatDialog } from '@angular/material/dialog';
import { SendMailDialogComponent } from '../send-mail-dialog/send-mail-dialog.component';
import { NotificationService } from '../../../core/services/notification.service';

export interface DialogData {
  currentUser: any;
  session?: AttendanceSession;
  isEdit?: boolean;
}

@Component({
  selector: 'app-attendance-create-dialog',
  templateUrl: './attendance-create-dialog.component.html',
  styleUrls: ['./attendance-create-dialog.component.css']
})
export class AttendanceCreateDialogComponent implements OnInit {
  attendanceForm: FormGroup;
  students: Student[] = [];
  courses: Course[] = [];
  classrooms: Classroom[] = [];
  selectedStudents: any[] = [];
  attendanceStatus = AttendanceStatus;
  isEditMode = false;

  constructor(
    public dialogRef: MatDialogRef<AttendanceCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private attendanceService: AttendanceService,
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    private classroomsService: ClassroomsService,
    private teacherService: TeacherService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {
    this.isEditMode = data.isEdit || false;
    this.attendanceForm = this.fb.group({
      courseId: ['', Validators.required],
      classroomId: ['', Validators.required],
      teacherId: [null, Validators.required], // Inicializar como null
      date: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadInitialData();
    // Obtener el ID del profesor por email antes de usar el formulario
    if (this.data.currentUser && this.data.currentUser.email) {
      this.teacherService.getAll().subscribe({
        next: (teachers: import('../../teacher/service/teacher.service').Teacher[]) => {
          const found = teachers.find((t: import('../../teacher/service/teacher.service').Teacher) => t.email === this.data.currentUser.email);
          if (found) {
            this.attendanceForm.patchValue({ teacherId: found.id });
            console.log('Teacher ID resolved for attendance:', found.id);
          } else {
            console.warn('No teacher found with email:', this.data.currentUser.email);
          }
        },
        error: (err: any) => {
          console.error('Error fetching teachers for attendance:', err);
        }
      });
    }

    if (this.isEditMode && this.data.session) {
      this.populateFormForEdit();
    }

    // Watch for classroom changes to load students
    this.attendanceForm.get('classroomId')?.valueChanges.subscribe(classroomId => {
      if (classroomId) {
        this.loadStudentsByClassroom(classroomId);
      }
    });
  }

  loadInitialData(): void {
    // Load courses for the teacher
    this.coursesService.getAll().subscribe({
      next: (courses: Course[]) => {
        // Filter courses for the current teacher if needed
        this.courses = courses;
      },
      error: (error) => console.error('Error loading courses:', error)
    });

    // Load classrooms
    this.classroomsService.getAll().subscribe({
      next: (classrooms: Classroom[]) => {
        this.classrooms = classrooms;
      },
      error: (error) => console.error('Error loading classrooms:', error)
    });
  }

  loadStudentsByClassroom(classroomId: number): void {
    this.studentsService.getAll().subscribe({
      next: (students: Student[]) => {
        // Filter students by classroom
        this.students = students.filter(student => student.classroomId === classroomId);
        this.initializeStudentAttendance();
      },
      error: (error) => console.error('Error loading students:', error)
    });
  }

  initializeStudentAttendance(): void {
    this.selectedStudents = this.students.map(student => ({
      studentId: student.id,
      studentName: `${student.firstName} ${student.lastNameFather} ${student.lastNameMother}`,
      status: AttendanceStatus.PRESENT
    }));
  }

  populateFormForEdit(): void {
    if (this.data.session) {
      this.attendanceForm.patchValue({
        courseId: this.data.session.courseId,
        classroomId: this.data.session.classroomId,
        teacherId: this.data.session.teacherId,
        date: this.data.session.date
      });

      // Cargar todos los alumnos del aula y combinar con los de la sesión
      this.studentsService.getAll().subscribe({
        next: (students: Student[]) => {
          this.students = students.filter(student => student.classroomId === this.data.session!.classroomId);
          // Mapear todos los alumnos del aula
          this.selectedStudents = this.students.map(student => {
            const attendance = this.data.session!.studentAttendances.find(a => a.studentId === student.id);
            return {
              attendanceId: attendance ? attendance.id : undefined,
              studentId: student.id,
              studentName: `${student.firstName} ${student.lastNameFather} ${student.lastNameMother}`,
              status: attendance ? attendance.status : AttendanceStatus.PRESENT
            };
          });
        },
        error: (error) => {
          console.error('Error loading students for edit:', error);
        }
      });
    }
  }

  toggleAttendanceStatus(student: any): void {
    const statuses = [AttendanceStatus.PRESENT, AttendanceStatus.ABSENT, AttendanceStatus.LATE];
    const currentIndex = statuses.indexOf(student.status);
    student.status = statuses[(currentIndex + 1) % statuses.length];
  }

  getStatusColor(status: AttendanceStatus): string {
    switch (status) {
      case AttendanceStatus.PRESENT:
        return '#4caf50';
      case AttendanceStatus.ABSENT:
        return '#f44336';
      case AttendanceStatus.LATE:
        return '#ff9800';
      default:
        return '#666';
    }
  }

  // Getter methods for template use
  get presentCount(): number {
    return this.selectedStudents.filter(s => s.status === AttendanceStatus.PRESENT).length;
  }

  get absentCount(): number {
    return this.selectedStudents.filter(s => s.status === AttendanceStatus.ABSENT).length;
  }

  get lateCount(): number {
    return this.selectedStudents.filter(s => s.status === AttendanceStatus.LATE).length;
  }

  onSubmit(): void {
    if (this.attendanceForm.valid && this.selectedStudents.length > 0) {
      const formValue = this.attendanceForm.value;
      console.log('Attendance form value:', formValue);
      console.log('Selected students:', this.selectedStudents);
      
      const attendances: StudentAttendanceDTO[] = this.selectedStudents.map(student => ({
        studentId: student.studentId,
        status: student.status
      }));

      const request: AttendanceSessionRequest = {
        courseId: formValue.courseId,
        classroomId: formValue.classroomId,
        teacherId: formValue.teacherId,
        date: formValue.date,
        attendances: attendances
      };
      console.log('AttendanceSessionRequest to send:', request);

      if (this.isEditMode && this.data.session && this.data.session.id !== undefined) {
        // Usar el nuevo endpoint para actualizar toda la sesión
        this.attendanceService.updateFullSession(Number(this.data.session.id), request).subscribe({
          next: (result) => {
            this.dialogRef.close(result);
          },
          error: (error) => {
            console.error('Error updating full attendance session:', error);
            this.snackBar.open('Error updating attendance session', 'Close', { duration: 3000 });
          }
        });
      } else {
        this.attendanceService.createSession(request).subscribe({
          next: (result) => {
            this.dialogRef.close(result);
          },
          error: (error) => {
            console.error('Error creating attendance session:', error);
            this.snackBar.open('Error creating attendance session', 'Close', { duration: 3000 });
          }
        });
      }
    }
  }

  handleAttendanceUpdates(): void {
    // For edit mode, update individual student attendances
    const updates = this.selectedStudents
      .filter(student => student.attendanceId)
      .map(student => 
        this.attendanceService.updateStudentAttendance(student.attendanceId, {
          id: student.attendanceId,
          studentId: student.studentId,
          status: student.status
        })
      );

    // Execute all updates
    Promise.all(updates.map(update => update.toPromise()))
      .then(() => {
        this.dialogRef.close(true);
      })
      .catch(error => {
        console.error('Error updating attendance:', error);
        this.snackBar.open('Error updating attendance', 'Close', { duration: 3000 });
      });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  openSendMailDialog(student: any): void {
    const parentEmail = this.getParentEmailForStudent(student.studentId);
    if (!parentEmail) {
      this.snackBar.open('No se encontró correo del padre para este estudiante', 'Cerrar', { duration: 3000 });
      return;
    }
    const dialogRef = this.dialog.open(SendMailDialogComponent, {
      width: '400px',
      data: { parentEmail }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.notificationService.sendEmail(result).subscribe({
          next: () => this.snackBar.open('Correo enviado correctamente', 'Cerrar', { duration: 3000 }),
          error: () => this.snackBar.open('Error al enviar el correo', 'Cerrar', { duration: 3000 })
        });
      }
    });
  }

  getParentEmailForStudent(studentId: number): string | undefined {
    const student = this.students.find(s => s.id === studentId);
    return student && student.parent ? student.parent.email : undefined;
  }
}
