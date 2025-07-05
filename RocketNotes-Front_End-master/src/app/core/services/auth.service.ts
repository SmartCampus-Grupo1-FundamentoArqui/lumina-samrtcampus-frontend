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

    login(email: string, password: string, userRole?: string): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        const requestBody = { email: email, password: password };
        
        // Determinar endpoint según el rol
        const endpoint = userRole === 'teacher' ? '/login-teacher' : '/login';

        return this.http.post(`${this.apiUrl}${endpoint}`, requestBody, httpOptions).pipe(
            map((response: any) => {
                if (response && response.token) {
                    // Decodificar el token JWT
                    const decodedToken: any = jwt_decode.default(response.token);
                    
                    // Determinar si es admin basado en el rol del token
                    const isAdmin = decodedToken.role === 'ADMIN';
                    
                    // Guardar en localStorage
                    this.localStorage.setItem('currentUser', JSON.stringify({
                        token: response.token,
                        isAdmin: isAdmin,
                        email: decodedToken.sub,
                        id: decodedToken.sub,
                        alias: decodedToken.sub,
                        role: decodedToken.role,
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
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        };

        // Mapear los datos al formato correcto que espera el backend
        const requestBody = {
            fullName: userData.fullName,
            email: userData.email,
            password: userData.password
        };

        console.log('Registration URL:', `${this.apiUrl}/register`);
        console.log('Registration data:', requestBody);
        
        return this.http.post(`${this.apiUrl}/register`, requestBody, httpOptions);
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

    isAuthenticated(): boolean {
        const user = this.getCurrentUser();
        return user && user.token && !this.isTokenExpired(user.token);
    }

    isAdmin(): boolean {
        const user = this.getCurrentUser();
        return user && user.role === 'ADMIN';
    }

    isTeacher(): boolean {
        const user = this.getCurrentUser();
        return user && user.role === 'TEACHER';
    }

    getUserRole(): string | null {
        const user = this.getCurrentUser();
        return user ? user.role : null;
    }

    private isTokenExpired(token: string): boolean {
        try {
            const decodedToken: any = jwt_decode.default(token);
            const currentTime = Date.now() / 1000;
            return decodedToken.exp < currentTime;
        } catch (error) {
            return true;
        }
    }
}
