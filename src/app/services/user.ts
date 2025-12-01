import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class User {
  private api = 'http://localhost:3000/api';

  getApiUrl(): string {
    return this.api;
  }
}
