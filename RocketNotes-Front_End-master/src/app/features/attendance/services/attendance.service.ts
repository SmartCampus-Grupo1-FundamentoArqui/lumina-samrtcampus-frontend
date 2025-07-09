import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environmentDevelopment } from '../../../../environments/environment.development';

export interface AttendanceSession {
  id?: number;
  courseId: number;
  classroomId: number;
  teacherId: number;
  date: string;
  dayOfWeek: string;
  weekOfYear: number;
  studentAttendances: StudentAttendance[];
}

export interface StudentAttendance {
  id?: number;
  studentId: number;
  status: AttendanceStatus;
  session?: AttendanceSession;
}

export interface AttendanceSessionRequest {
  courseId: number;
  classroomId: number;
  teacherId: number;
  date: string;
  attendances: StudentAttendanceDTO[];
}

export interface StudentAttendanceDTO {
  studentId: number;
  status: AttendanceStatus;
}

export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  LATE = 'LATE'
}

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  private apiUrl = `${environmentDevelopment.serverBasePath}/attendance/sessions`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${currentUser.token || ''}`
    });
  }

  // Crear sesión de asistencia
  createSession(request: AttendanceSessionRequest): Observable<AttendanceSession> {
    return this.http.post<AttendanceSession>(this.apiUrl, request, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error creating attendance session:', error);
        return throwError(() => error);
      })
    );
  }

  // Obtener sesiones por profesor
  getSessionsByTeacher(teacherId: number): Observable<AttendanceSession[]> {
    return this.http.get<AttendanceSession[]>(`${this.apiUrl}/teacher/${teacherId}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error fetching teacher sessions:', error);
        return throwError(() => error);
      })
    );
  }

  // Obtener sesión por ID
  getSessionById(id: number): Observable<AttendanceSession> {
    return this.http.get<AttendanceSession>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error fetching session:', error);
        return throwError(() => error);
      })
    );
  }

  // Actualizar asistencia de estudiante
  updateStudentAttendance(id: number, updatedAttendance: StudentAttendance): Observable<StudentAttendance> {
    return this.http.put<StudentAttendance>(`${this.apiUrl}/student-attendance/${id}`, updatedAttendance, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error updating student attendance:', error);
        return throwError(() => error);
      })
    );
  }

  // Actualizar o agregar asistencias de todos los alumnos de una sesión
  updateFullSession(sessionId: number, request: AttendanceSessionRequest): Observable<AttendanceSession> {
    return this.http.put<AttendanceSession>(`${this.apiUrl}/${sessionId}/full-update`, request, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error updating full session:', error);
        return throwError(() => error);
      })
    );
  }

  // Obtener historial por curso y semana
  getHistoryByCourseAndWeek(courseId: number, week: number): Observable<AttendanceSession[]> {
    return this.http.get<AttendanceSession[]>(`${this.apiUrl}/history?courseId=${courseId}&week=${week}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error fetching attendance history:', error);
        return throwError(() => error);
      })
    );
  }

  // Obtener todas las sesiones de asistencia
  getAllSessions(): Observable<AttendanceSession[]> {
    return this.http.get<AttendanceSession[]>(this.apiUrl, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error fetching all attendance sessions:', error);
        return throwError(() => error);
      })
    );
  }
}
