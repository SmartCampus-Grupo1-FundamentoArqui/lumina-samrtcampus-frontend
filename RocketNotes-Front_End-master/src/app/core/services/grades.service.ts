import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environmentDevelopment } from '../../../environments/environment.development';

export interface Grade {
  id?: string;
  studentId: string;
  courseId: string;
  score: number;
  semester: string;
  year: number;
  gradeType?: string;
  date?: Date;
  // Añadido para integración con GradeEntry
  nota1?: number | undefined;
  nota2?: number | undefined;
  nota3?: number | undefined;
  nota4?: number | undefined;
  nota5?: number | undefined;
  nota6?: number | undefined;
  nota7?: number | undefined;
  [key: string]: any; // Permite acceso dinámico a las notas
}

@Injectable({
  providedIn: 'root'
})
export class GradesService {

  private apiUrl = `${environmentDevelopment.serverBasePath}/grades`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${currentUser.token || ''}`
    });
  }

  getAll(): Observable<Grade[]> {
    return this.http.get<Grade[]>(this.apiUrl, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error fetching grades:', error);
        return throwError(() => error);
      })
    );
  }

  getById(id: string): Observable<Grade> {
    return this.http.get<Grade>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error fetching grade:', error);
        return throwError(() => error);
      })
    );
  }

  getByStudentId(studentId: string): Observable<Grade[]> {
    return this.http.get<Grade[]>(`${this.apiUrl}/student/${studentId}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error fetching student grades:', error);
        return throwError(() => error);
      })
    );
  }

  getByCourseId(courseId: string): Observable<Grade[]> {
    return this.http.get<Grade[]>(`${this.apiUrl}/course/${courseId}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error fetching course grades:', error);
        return throwError(() => error);
      })
    );
  }

  getByCourseAndClassroom(courseId: string, classroomId: string): Observable<Grade[]> {
    return this.http.get<Grade[]>(`${environmentDevelopment.serverBasePath}/gradebook/entries/course/${courseId}/classroom/${classroomId}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error fetching grades by course and classroom:', error);
        return throwError(() => error);
      })
    );
  }

  create(grade: Grade): Observable<Grade> {
    // POST al endpoint correcto del microservicio
    return this.http.post<Grade>(`${environmentDevelopment.serverBasePath}/gradebook/entries`, grade, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error creating grade:', error);
        return throwError(() => error);
      })
    );
  }

  update(id: string, grade: Grade): Observable<Grade> {
    return this.http.put<Grade>(`${this.apiUrl}/${id}`, grade, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error updating grade:', error);
        return throwError(() => error);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error deleting grade:', error);
        return throwError(() => error);
      })
    );
  }
}