import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environmentDevelopment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class TeacherService {
  private apiUrl = `${environmentDevelopment.serverBasePath}/teachers`;

  constructor(private http: HttpClient) {}

  getByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/email/${email}`).pipe(
      catchError(error => {
        console.error('Error fetching teacher by email:', error);
        return throwError(() => error);
      })
    );
  }
}
