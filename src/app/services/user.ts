import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})

export class User {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getProfile() {
    
    return this.http.get(`${API_URL}/users/profile`);
  }
}
