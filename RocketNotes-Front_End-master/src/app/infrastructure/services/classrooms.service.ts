import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environmentDevelopment } from "../../../environments/environment.development";
import { Classroom } from '../model/classroom.entity';

export interface ClassroomRequest {
  section: string;
  roomNumber: string;  // Cambio de room_number a roomNumber para coincidir con el backend
  capacity: number;
  gradeId: number;    // Cambio de grade_id a gradeId para coincidir con el backend
  imageUrl?: string;  // Campo opcional
}

@Injectable({
  providedIn: 'root'
})
export class ClassroomsService {
  // La ruta debe coincidir con el @RequestMapping del controller
  private apiUrl = `${environmentDevelopment.serverBasePath}/classrooms`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${currentUser.token || ''}`
    });
  }

  getAll(): Observable<Classroom[]> {
    return this.http.get<Classroom[]>(this.apiUrl, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(error => {
          console.error('Error fetching classrooms:', error);
          return throwError(() => error);
        })
      );
  }

  getById(id: string): Observable<Classroom> {
    return this.http.get<Classroom>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(error => {
          console.error('Error fetching classroom:', error);
          return throwError(() => error);
        })
      );
  }

  create(classroom: ClassroomRequest): Observable<Classroom> {
    return this.http.post<Classroom>(this.apiUrl, classroom, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(error => {
          console.error('Error creating classroom:', error);
          return throwError(() => error);
        })
      );
  }

  update(id: string, classroom: ClassroomRequest): Observable<Classroom> {
    return this.http.put<Classroom>(`${this.apiUrl}/${id}`, classroom, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(error => {
          console.error('Error updating classroom:', error);
          return throwError(() => error);
        })
      );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(error => {
          console.error('Error deleting classroom:', error);
          return throwError(() => error);
        })
      );
  }

  hasSpace(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/${id}/has-space`, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(error => {
          console.error('Error checking classroom space:', error);
          return throwError(() => error);
        })
      );
  }

  incrementStudentCount(id: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/increment`, null, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(error => {
          console.error('Error incrementing student count:', error);
          return throwError(() => error);
        })
      );
  }
}
