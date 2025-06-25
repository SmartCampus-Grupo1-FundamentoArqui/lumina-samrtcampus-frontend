import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environmentDevelopment } from "../../../../environments/environment.development";

export interface Teacher {
  id?: string;
  name: string;
  email: string;
  department?: string;
  subject?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private apiUrl = `${environmentDevelopment.serverBasePath}/teachers`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${currentUser.token || ''}`
    });
  }

  getAll(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.apiUrl, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error fetching teachers:', error);
        return throwError(() => error);
      })
    );
  }

  getById(id: string): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error fetching teacher:', error);
        return throwError(() => error);
      })
    );
  }

  create(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(this.apiUrl, teacher, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error creating teacher:', error);
        return throwError(() => error);
      })
    );
  }

  update(id: string, teacher: Teacher): Observable<Teacher> {
    return this.http.put<Teacher>(`${this.apiUrl}/${id}`, teacher, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error updating teacher:', error);
        return throwError(() => error);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error deleting teacher:', error);
        return throwError(() => error);
      })
    );
  }
}
