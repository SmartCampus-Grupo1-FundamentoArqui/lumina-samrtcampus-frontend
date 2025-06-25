import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environmentDevelopment } from "../../../../environments/environment.development";

export interface Facility {
  id?: string;
  name: string;
  type: string;
  capacity?: number;
  status?: string;
  location?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FacilitieService {

  private apiUrl = `${environmentDevelopment.serverBasePath}/maintenances/facilities`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${currentUser.token || ''}`
    });
  }

  getAll(): Observable<Facility[]> {
    return this.http.get<Facility[]>(this.apiUrl, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error fetching facilities:', error);
        return throwError(() => error);
      })
    );
  }

  getById(id: string): Observable<Facility> {
    return this.http.get<Facility>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error fetching facility:', error);
        return throwError(() => error);
      })
    );
  }

  create(facility: Facility): Observable<Facility> {
    return this.http.post<Facility>(this.apiUrl, facility, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error creating facility:', error);
        return throwError(() => error);
      })
    );
  }

  update(id: string, facility: Facility): Observable<Facility> {
    return this.http.put<Facility>(`${this.apiUrl}/${id}`, facility, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error updating facility:', error);
        return throwError(() => error);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error deleting facility:', error);
        return throwError(() => error);
      })
    );
  }
}
