import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

// Allow access to injected build-time env variables provided by dotenv-webpack
declare const process: any;
const API_URL = process?.env?.API_URL || '/api';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(payload: { name?: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${API_URL}/auth/signup`, payload).pipe(
      tap((res: any) => {
        if (res?.token) sessionStorage.setItem('token', res.token);
      })
    );
  }

  login(payload: { email: string; password: string }): Observable<any> {
    return this.http.post(`${API_URL}/auth/login`, payload).pipe(
      tap((res: any) => {
        if (res?.token) sessionStorage.setItem('token', res.token);
      })
    );
  }

  logout(): void {
    sessionStorage.removeItem('token');
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
