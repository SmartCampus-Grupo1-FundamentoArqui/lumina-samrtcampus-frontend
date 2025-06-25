import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { delay, map, catchError } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import * as moment from 'moment';

import { environment } from '../../../environments/environment';
import { environmentDevelopment } from '../../../environments/environment.development';
import { of, EMPTY, Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private apiUrl = `${environmentDevelopment.serverBasePath}/auth`;

    constructor(private http: HttpClient,
        @Inject('LOCALSTORAGE') private localStorage: Storage) {
    }

    login(usernameOrEmail: string, password: string): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        // Determinar si es email o username
        const isEmail = usernameOrEmail.includes('@');
        const requestBody = isEmail ? 
            { email: usernameOrEmail, password: password } :
            { username: usernameOrEmail, password: password };

        return this.http.post(`${this.apiUrl}/login`, requestBody, httpOptions).pipe(
            map((response: any) => {
                if (response && response.token) {
                    // Decodificar el token JWT
                    const decodedToken: any = jwt_decode.default(response.token);
                    
                    // Guardar en localStorage
                    this.localStorage.setItem('currentUser', JSON.stringify({
                        token: response.token,
                        isAdmin: true, // Puedes ajustar esto según tu lógica
                        email: decodedToken.sub,
                        id: decodedToken.sub,
                        alias: decodedToken.sub,
                        expiration: new Date(decodedToken.exp * 1000),
                        fullName: decodedToken.sub
                    }));

                    return true;
                }
                return false;
            }),
            catchError(error => {
                console.error('Login error:', error);
                return throwError(() => error);
            })
        );
    }

    register(userData: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        return this.http.post(`${this.apiUrl}/register`, userData, httpOptions);
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.localStorage.removeItem('currentUser');
    }

    getCurrentUser(): any {
        return JSON.parse(this.localStorage.getItem('currentUser') || '{}');
    }

    passwordResetRequest(email: string): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        return this.http.post(`${this.apiUrl}/password-reset-request`, { email }, httpOptions);
    }

    changePassword(email: string, currentPwd: string, newPwd: string): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        return this.http.post(`${this.apiUrl}/change-password`, {
            email: email,
            currentPassword: currentPwd,
            newPassword: newPwd
        }, httpOptions);
    }

    passwordReset(email: string, token: string, password: string, confirmPassword: string): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        return this.http.post(`${this.apiUrl}/password-reset`, {
            email: email,
            token: token,
            password: password,
            confirmPassword: confirmPassword
        }, httpOptions);
    }
}
