import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

import { TopBarComponent } from '../../shared/components/top-bar/top-bar';
import { UserProfileComponent } from '../../shared/components/user-profile/user-profile';
import { CreatePostComponent } from '../../shared/components/create-post/create-post';
import { BlogCardComponent } from '../../shared/components/blog-card/blog-card';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
    // RouterLink
],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  // Mock data - will be replaced with actual service calls
  blogs = [
    {
      id: '1',
      title: 'Getting Started with Angular',
      content: 'Angular is a platform and framework for building single-page client applications using HTML and TypeScript...',
      author: 'John Doe',
      date: new Date(),
      likes: 15,
      comments: [
        {
          id: '1',
          content: 'Great article!',
          author: 'Jane Smith',
          date: new Date()
        }
      ]
    },
    {
      id: '2',
      title: 'The Power of TypeScript',
      content: 'TypeScript is a strongly typed programming language that builds on JavaScript...',
      author: 'Jane Smith',
      date: new Date(),
      likes: 10,
      comments: []
    }
  ];
  constructor(private auth: AuthService) {}

  get isGuest(): boolean {
    return !this.auth.isLoggedIn();
  }
}
