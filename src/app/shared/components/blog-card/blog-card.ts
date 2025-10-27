import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';

interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  date: Date;
  likes: number;
  comments: Comment[];
}

interface Comment {
  id: string;
  content: string;
  author: string;
  date: Date;
}

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDividerModule
  ],
  templateUrl: './blog-card.html',
  styleUrls: ['./blog-card.scss']
})
export class BlogCardComponent {
  @Input() blog!: Blog;
  isCommentOpen: boolean = false;

  toggleComments() {
    this.isCommentOpen = !this.isCommentOpen;
  }

  addLike() {
    // Will be implemented with service
    this.blog.likes++;
  }

  addComment(comment: string) {
    // Will be implemented with service
    if (comment.trim()) {
      this.blog.comments.push({
        id: Date.now().toString(),
        content: comment,
        author: 'Current User', // Will be replaced with actual user
        date: new Date()
      });
    }
  }
}