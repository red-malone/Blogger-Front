import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const API_URL = 'http://localhost:3000';
@Injectable({
  providedIn: 'root',
})
export class Blog {
  constructor(private http: HttpClient) {}

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

  getPost(id: string): Observable<any> {
    return this.http.get(`${API_URL}/blogs/${id}`);
  }

  createPost(payload: any): Observable<any> {
    return this.http.post(`${API_URL}/blogs`, payload);
  }

  updatePost(id: string, payload: any): Observable<any> {
    return this.http.put(`${API_URL}/blogs/${id}`, payload);
  }

  deletePost(id: string): Observable<any> {
    return this.http.delete(`${API_URL}/posts/${id}`);
  }
}
