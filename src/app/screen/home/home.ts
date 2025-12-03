import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Blog } from '../../services/blog';
import { Observable } from 'rxjs';

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
export class Home implements OnInit {
  // expose an observable so the template can use the async pipe
  blogs$: Observable<any[]> = new Observable();

  constructor(private auth: AuthService, private blogService: Blog) {}

  ngOnInit() {
    // assign the normalized Observable from the service
    this.blogs$ = this.blogService.getBlogs();
  }

  get isGuest(): boolean {
    return !this.auth.isLoggedIn();
  }
}
