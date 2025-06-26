import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environmentDevelopment } from "../../../../environments/environment.development";

// Interfaz para crear una nueva instalación
export interface CreateFacilityDto {
  name: string;
  description: string;
  budget: number;
  period: number;
}

// Interfaz para la respuesta del servidor y datos en la tabla
export interface Facility {
  id?: number;
  name: string;
  description: string;
  budget: number;
  creation: string;
  finalization: string;
  period: number;
  state: string;
}

@Injectable({
  providedIn: 'root'
})
export class FacilitieService {
  private URL = `${environmentDevelopment.serverBasePath}/facilities`;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getAll(): Observable<Facility[]> {
    return this.http.get<Facility[]>(this.URL).pipe(
      catchError(error => {
        console.error('Error fetching facilities:', error);
        return throwError(() => error);
      })
    );
  }

  create(facility: CreateFacilityDto): Observable<Facility> {
    return this.http.post<Facility>(this.URL, facility, this.httpOptions).pipe(
      catchError(error => {
        console.error('Error creating facility:', error);
        return throwError(() => error);
      })
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`, this.httpOptions).pipe(
      catchError(error => {
        console.error(`Error deleting facility ${id}:`, error);
        return throwError(() => error);
      })
    );
  }
}
