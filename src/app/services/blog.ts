import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

const API_URL = 'http://localhost:3000';
@Injectable({
  providedIn: 'root',
})
export class Blog {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getBlogs(): Observable<any[]> {
    return this.http.get(`${API_URL}/blogs`).pipe(
      // normalize response shape: either an array or { blogs: [...] }
      map((res: any) => {
        if (Array.isArray(res)) return res;
        if (res && Array.isArray(res.blogs)) return res.blogs;
        return [] as any[];
      })
    );
  }
  getBlog(): Observable<any> {
    const id = this.authService.getUserId();
    console.log('Fetching blog for user ID:', id);
    return this.http.get(`${API_URL}/blogs/${id}`).pipe(
      map((res: any) =>{
        if (Array.isArray(res)) return res;
        if (res && Array.isArray(res.blogs)) return res.blogs;
        return [] as any[];
      })
    );
  }
  createBlog(payload: any): Observable<any> {
    return this.http.post(`${API_URL}/blogs`, payload);
  }
  updateBlog(id: string, payload: any): Observable<any> {
    return this.http.put(`${API_URL}/blogs/${id}`, payload);
  }
  deleteBlog(id: string): Observable<any> {
    return this.http.delete(`${API_URL}/blogs/${id}`);
  }
}
