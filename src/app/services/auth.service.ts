import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

const API_URL = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(payload: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${API_URL}/users/register`, payload)
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
    try {
      const payload = token.split('.')[1];
      // handle base64url padding
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, '=');
      const decodedPayload = atob(padded);
      return JSON.parse(decodedPayload);
    } catch (e) {
      return null;
    }
  }
  getUserId(): string | null {
    const decoded = this.decodeToken();
    return decoded ? decoded.id : null;
  }

  isTokenExpired(): boolean {
    const decoded = this.decodeToken();
    if (!decoded) return true;
    // JWT `exp` is seconds since epoch
    if (decoded.exp && typeof decoded.exp === 'number') {
      const now = Math.floor(Date.now() / 1000);
      return decoded.exp < now;
    }
    // if no exp claim, treat as expired for safety
    return true;
  }
}
