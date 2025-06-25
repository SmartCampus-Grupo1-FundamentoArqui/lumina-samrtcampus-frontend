import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environmentDevelopment } from "../../../environments/environment.development";

export interface Classroom {
  id?: string;
  name: string;
  capacity: number;
  type?: string;
  location?: string;
  equipment?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ClassroomsService {

  private apiUrl = `${environmentDevelopment.serverBasePath}/schedule/classrooms`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${currentUser.token || ''}`
    });
  }

  getAll(): Observable<Classroom[]> {
    return this.http.get<Classroom[]>(this.apiUrl, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error fetching classrooms:', error);
        return throwError(() => error);
      })
    );
  }

  getById(id: string): Observable<Classroom> {
    return this.http.get<Classroom>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error fetching classroom:', error);
        return throwError(() => error);
      })
    );
  }

  create(classroom: Classroom): Observable<Classroom> {
    return this.http.post<Classroom>(this.apiUrl, classroom, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error creating classroom:', error);
        return throwError(() => error);
      })
    );
  }

  update(id: string, classroom: Classroom): Observable<Classroom> {
    return this.http.put<Classroom>(`${this.apiUrl}/${id}`, classroom, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error updating classroom:', error);
        return throwError(() => error);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error deleting classroom:', error);
        return throwError(() => error);
      })
    );
  }
}
