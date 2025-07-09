import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environmentDevelopment } from '../../../environments/environment.development';

export interface Schedule {
  id?: string;
  courseId: string;
  classroomId: string;
  teacherId: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  semester: string;
  year: number;
}

export interface ScheduleValidationRequest {
  teacherId: string;
  schedule: string;
}

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private apiUrl = `${environmentDevelopment.serverBasePath}/schedule`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${currentUser.token || ''}`
    });
  }

  getAll(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(this.apiUrl, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error fetching schedules:', error);
        return throwError(() => error);
      })
    );
  }

  getById(id: string): Observable<Schedule> {
    return this.http.get<Schedule>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error fetching schedule:', error);
        return throwError(() => error);
      })
    );
  }

  getByTeacherId(teacherId: string): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${this.apiUrl}/teacher/${teacherId}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error fetching teacher schedules:', error);
        return throwError(() => error);
      })
    );
  }

  getByClassroomId(classroomId: string): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${this.apiUrl}/classroom/${classroomId}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error fetching classroom schedules:', error);
        return throwError(() => error);
      })
    );
  }

  create(schedule: ScheduleValidationRequest): Observable<any> {
    return this.http.post<any>(this.apiUrl, schedule, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error creating schedule:', error);
        return throwError(() => error);
      })
    );
  }

  update(id: string, schedule: Schedule): Observable<Schedule> {
    return this.http.put<Schedule>(`${this.apiUrl}/${id}`, schedule, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error updating schedule:', error);
        return throwError(() => error);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error deleting schedule:', error);
        return throwError(() => error);
      })
    );
  }
}