import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from "../../shared/services/base.service";
import { Course } from "../model/course.entity";
import { Observable, of, throwError } from 'rxjs';
import { environmentDevelopment } from "../../../environments/environment.development";
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CoursesService {

  private apiUrl = `${environmentDevelopment.serverBasePath}/courses`;

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${currentUser.token || ''}`
    });
  }

  getAll(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error fetching courses:', error);
        return throwError(() => error);
      })
    );
  }

  getCourseById(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error fetching course:', error);
        return throwError(() => error);
      })
    );
  }

  create(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error creating course:', error);
        return throwError(() => error);
      })
    );
  }

  update(id: string, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}`, course, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error updating course:', error);
        return throwError(() => error);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error deleting course:', error);
        return throwError(() => error);
      })
    );
  }
}
