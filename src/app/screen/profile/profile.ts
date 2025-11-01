import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BlogCardComponent } from '../../shared/components/blog-card/blog-card';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    BlogCardComponent
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class ProfileComponent {
  user = {
    name: 'John Doe',
    bio: 'Passionate writer and storyteller',
    followers: 120,
    following: 85,
    posts: 24,
    coverImage: 'https://source.unsplash.com/random/1200x300/?nature',
    profileImage: 'https://ui-avatars.com/api/?name=John+Doe&size=200'
  };

  blogs = [
    {
      id: '1',
      title: 'Getting Started with Angular',
      content: 'Angular is a platform and framework for building single-page client applications using HTML and TypeScript...',
      author: 'John Doe',
      date: new Date(),
      likes: 15,
      comments: []
    },
    {
      id: '2',
      title: 'The Power of TypeScript',
      content: 'TypeScript is a strongly typed programming language that builds on JavaScript...',
      author: 'John Doe',
      date: new Date(),
      likes: 10,
      comments: []
    }
  ];
}