import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

const API_URL = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(payload: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${API_URL}/users/register`, payload).pipe(
      tap((res: any) => {
        if (res?.token) sessionStorage.setItem('token', res.token);
      })
    );
  }

  login(payload: { email: string; password: string }): Observable<any> {
    return this.http.post(`${API_URL}/users/login`, payload).pipe(
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

  decodeToken():any{
    const token = this.getToken();
    if (!token) return null;
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
  }
  getUserId(): string | null {
    const decoded = this.decodeToken();
    return decoded ? decoded.id : null;
  }
}
