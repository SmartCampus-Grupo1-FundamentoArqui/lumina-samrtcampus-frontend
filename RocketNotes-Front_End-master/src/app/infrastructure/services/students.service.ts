import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environmentDevelopment } from "../../../environments/environment.development";

export interface Student {
  id?: number;
  firstName: string;
  lastNameFather: string;
  lastNameMother: string;
  dni: string;
  classroomId?: number;
  parent?: Parent;
  classroom?: { id: number }; // Para compatibilidad con backend
}

export interface Parent {
  firstName: string;
  lastNameFather: string;
  lastNameMother: string;
  dni: string;
  phone: string;
  email: string;
}

export interface StudentRequest {
  firstName: string;
  lastNameFather: string;
  lastNameMother: string;
  dni: string;
  classroomId: number;
  parent: ParentRequest;
}

export interface ParentRequest {
  firstName: string;
  lastNameFather: string;
  lastNameMother: string;
  dni: string;
  phone: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private apiUrl = `${environmentDevelopment.serverBasePath}/students`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${currentUser.token || ''}`
    });
  }

  getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl, { headers: this.getAuthHeaders() }).pipe(
      map(students => students.map(student => ({
        ...student,
        classroomId: student.classroomId ?? (student.classroom && student.classroom.id ? student.classroom.id : undefined)
      }))),
      catchError(error => {
        console.error('Error fetching students:', error);
        return throwError(() => error);
      })
    );
  }

  getById(id: string): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() }).pipe(
      map(student => ({
        ...student,
        classroomId: student.classroomId ?? (student.classroom && student.classroom.id ? student.classroom.id : undefined)
      })),
      catchError(error => {
        console.error('Error fetching student:', error);
        return throwError(() => error);
      })
    );
  }

  create(request: StudentRequest): Observable<Student> {
    console.log('Sending student data to backend:', {
      request,
      url: this.apiUrl,
      headers: this.getAuthHeaders()
    });
    return this.http.post<Student>(this.apiUrl, request, { headers: this.getAuthHeaders() }).pipe(
      map(response => {
        // Mapear classroomId si viene anidado
        return {
          ...response,
          classroomId: response.classroomId ?? (response.classroom && response.classroom.id ? response.classroom.id : undefined)
        };
      }),
      catchError(error => {
        console.error('Error creating student:', error);
        return throwError(() => error);
      })
    );
  }

  update(id: string, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${id}`, student, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error updating student:', error);
        return throwError(() => error);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error deleting student:', error);
        return throwError(() => error);
      })
    );
  }

  assignClassroom(studentId: number, classroomId: number): Observable<Student> {
    return this.http.put<Student>(
      `${this.apiUrl}/${studentId}/assign-classroom`, 
      { classroomId }, 
      { headers: this.getAuthHeaders() }
    ).pipe(
      catchError(error => {
        console.error('Error assigning classroom to student:', error);
        return throwError(() => error);
      })
    );
  }
}
