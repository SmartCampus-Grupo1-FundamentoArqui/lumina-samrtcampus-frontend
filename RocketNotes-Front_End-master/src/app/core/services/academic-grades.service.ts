import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environmentDevelopment } from '../../../environments/environment.development';

export interface AcademicGrade {
  id?: number;
  name: string;
  level: string;
}

@Injectable({
  providedIn: 'root'
})
export class AcademicGradesService {

  private apiUrl = `${environmentDevelopment.serverBasePath}/grades`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${currentUser.token || ''}`
    });
  }

  getAll(): Observable<AcademicGrade[]> {
    return this.http.get<AcademicGrade[]>(this.apiUrl, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error fetching academic grades:', error);
        return throwError(() => error);
      })
    );
  }

  getById(id: number): Observable<AcademicGrade> {
    return this.http.get<AcademicGrade>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error fetching academic grade:', error);
        return throwError(() => error);
      })
    );
  }

  create(grade: AcademicGrade): Observable<AcademicGrade> {
    return this.http.post<AcademicGrade>(this.apiUrl, grade, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error creating academic grade:', error);
        return throwError(() => error);
      })
    );
  }

  update(id: number, grade: AcademicGrade): Observable<AcademicGrade> {
    return this.http.put<AcademicGrade>(`${this.apiUrl}/${id}`, grade, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error updating academic grade:', error);
        return throwError(() => error);
      })
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error deleting academic grade:', error);
        return throwError(() => error);
      })
    );
  }

  hasSpace(id: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/${id}/has-space`, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error checking grade space:', error);
        return throwError(() => error);
      })
    );
  }

  incrementStudentCount(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/increment`, {}, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error incrementing student count:', error);
        return throwError(() => error);
      })
    );
  }
} 