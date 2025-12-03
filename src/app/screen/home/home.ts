import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Blog } from '../../services/blog';

import { TopBarComponent } from '../../shared/components/top-bar/top-bar';
import { UserProfileComponent } from '../../shared/components/user-profile/user-profile';
import { CreatePostComponent } from '../../shared/components/create-post/create-post';
import { BlogCardComponent } from '../../shared/components/blog-card/blog-card';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NoBlog } from "../../shared/components/no-blog/no-blog";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TopBarComponent,
    UserProfileComponent,
    // CreatePostComponent,
    BlogCardComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    NoBlog
],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  // changed from Observable<any[]> to a plain array so the template can iterate over it
  blogs: any[] = [];

  constructor(private auth: AuthService, private blogService: Blog) {
    // initialize blogs after services are available by subscribing to the Observable
    this.blogService.getBlogs().subscribe((res: any) => {
      // API returns { status: 'Success', blogs: [...] }
      if (Array.isArray(res)) {
        // service returned the array directly
        this.blogs = res;
      } else if (res && Array.isArray(res.blogs)) {
        // service returned the wrapper object
        this.blogs = res.blogs;
      } else {
        // fallback to empty array
        this.blogs = [];
      }
    }, (err) => {
      console.error('Failed to load blogs', err);
      this.blogs = [];
    });
  }

  get isGuest(): boolean {
    return !this.auth.isLoggedIn();
  }
}
