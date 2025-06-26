import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environmentDevelopment } from "../../../../environments/environment.development";

export interface CreateEquipmentDto {
  name: string;
  quantity: number;
  budget: number;
  period: number;
}

export interface Equipment {
  id: number;
  name: string;
  quantity: number;
  budget: number;
  creation: string;
  finalization: string;
  period: number;
  state: string;
}

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  private apiUrl = `${environmentDevelopment.serverBasePath}/equipments`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${currentUser.token || ''}`
    });
  }

  getAll(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(this.apiUrl, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error fetching equipment:', error);
        return throwError(() => error);
      })
    );
  }

  getById(id: string): Observable<Equipment> {
    return this.http.get<Equipment>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error fetching equipment:', error);
        return throwError(() => error);
      })
    );
  }

  create(equipment: CreateEquipmentDto): Observable<Equipment> {
    return this.http.post<Equipment>(this.apiUrl, equipment, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error creating equipment:', error);
        return throwError(() => error);
      })
    );
  }

  update(id: string, equipment: Equipment): Observable<Equipment> {
    return this.http.put<Equipment>(`${this.apiUrl}/${id}`, equipment, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error updating equipment:', error);
        return throwError(() => error);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error deleting equipment:', error);
        return throwError(() => error);
      })
    );
  }
}
