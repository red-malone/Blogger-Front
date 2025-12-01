import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
],
  templateUrl: './create-post.html',
  styleUrls: ['./create-post.scss']
})
export class CreatePostComponent {
  postContent: string = '';

  createPost() {
    // Will be implemented with service
    if (this.postContent.trim()) {
      console.log('Creating post:', this.postContent);
      this.postContent = '';
    }
  }
}