import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
const API_URL = environment?.apiUrl?.replace(/\/\/$/, '') || 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})

export class User {
  constructor(private http: HttpClient) {}
  
  getProfile() {
    return this.http.get(`${API_URL}/user/profile`);
  }
}
