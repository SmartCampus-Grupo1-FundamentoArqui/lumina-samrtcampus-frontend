import { Injectable } from '@angular/core';

import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";
import {environmentDevelopment} from "../../../environments/environment.development";
import {catchError, Observable, retry, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class BaseService <T>{
  basePath: string= `${environmentDevelopment.serverBasePath}`;
  resourceEndpoint: string='/resources';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.log(`An error ocurred ${error.error.message}`);
    } else{
      console.log(`Backend returned code ${error.status}, body was ${error}`);
    }
    return throwError(()=>new Error('Something happened with request. Please try again later.'))
  }

  private resourcePath():string{
    return `${this.basePath}${this.resourceEndpoint}`
  }


  get(){
    return this.http.get(this.resourcePath())
  }

  create(item: any): Observable<T>{
    return this.http.post<T>(this.resourcePath(),
        JSON.stringify(item), this.httpOptions)
        .pipe(retry(2),catchError(this.handleError))
  }
}


