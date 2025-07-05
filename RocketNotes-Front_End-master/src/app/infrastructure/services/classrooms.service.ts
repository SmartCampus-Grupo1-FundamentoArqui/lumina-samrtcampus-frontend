import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError, forkJoin, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environmentDevelopment } from "../../../environments/environment.development";
import { Classroom } from '../model/classroom.entity';
import { AcademicGradesService } from '../../core/services/academic-grades.service';

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

  constructor(
    private http: HttpClient,
    private academicGradesService: AcademicGradesService
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${currentUser.token || ''}`
    });
  }

  getAll(): Observable<Classroom[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getAuthHeaders() })
      .pipe(
        switchMap(classrooms => {
          if (!classrooms || classrooms.length === 0) {
            return of([]);
          }
          
          // Obtener todos los grados académicos
          return this.academicGradesService.getAll().pipe(
            map(grades => {
              // Enriquecer cada aula con la información del grado
              return classrooms.map(classroom => ({
                ...classroom,
                grade: grades.find(g => g.id === classroom.gradeId) || { id: 0, name: 'Unknown', level: 'Unknown' }
              }));
            }),
            catchError(gradesError => {
              console.warn('Error loading grades, using basic classroom data:', gradesError);
              // Si falla la carga de grados, devolver las aulas sin enriquecer
              return of(classrooms.map(classroom => ({
                ...classroom,
                grade: { id: classroom.gradeId || 0, name: 'Unknown', level: 'Unknown' }
              })));
            })
          );
        }),
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

  decrementStudentCount(id: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/decrement`, null, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(error => {
          console.error('Error decrementing student count:', error);
          return throwError(() => error);
        })
      );
  }
}
