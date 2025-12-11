import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Blog as BlogService } from '../../../services/blog';
import { AuthService } from '../../../services/auth.service';
import { Blog } from '../../../models/blog.model';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatCardModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatIcon],
  templateUrl: './create-post.html',
  styleUrls: ['./create-post.scss']
})
export class CreatePostComponent implements OnInit, OnChanges {
  @Input() blog?: Blog | null;
  @Output() saved = new EventEmitter<Blog>();

  form: FormGroup;
  editMode = false;

  constructor(private fb: FormBuilder, private blogService: BlogService, private auth: AuthService) {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      category: [''],
      tags: [''] // comma separated
    });
  }

  ngOnInit(): void {
    if (this.blog) {
      this.populateFromBlog(this.blog);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['blog'] && changes['blog'].currentValue) {
      this.populateFromBlog(changes['blog'].currentValue);
    }
  }

  private populateFromBlog(blog: Blog) {
    this.editMode = !!blog && !!blog._id;
    this.form.patchValue({
      title: blog.title || '',
      content: blog.content || '',
      category: blog.category || '',
      tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : ''
    });
  }

  createOrUpdate() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.value;
    const tags = raw.tags ? raw.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [];

    const payload: any = {
      title: raw.title,
      content: raw.content
    };
    if (raw.category) payload.category = raw.category;
    if (tags.length) payload.tags = tags;

    if (this.editMode && this.blog && this.blog._id) {
      // update
      this.blogService.updateBlog(this.blog._id, payload).subscribe({
        next: (res: any) => {
          const updated = res?.blog || res;
          this.saved.emit(updated);
        },
        error: (err) => {
          console.error('Failed to update blog', err);
        }
      });
    } else {
      // create
      const authorId = this.auth.getUserId();
      if (!authorId) {
        console.error('No authenticated user to create blog');
        return;
      }
      payload.authorId = authorId;

      this.blogService.createBlog(payload).subscribe({
        next: (res: any) => {
          const created = res?.blog || res;
          this.form.reset();
          this.saved.emit(created);
        },
        error: (err) => {
          console.error('Failed to create blog', err);
        }
      });
    }
  }
  // In your component class
isExpanded = false;

// Update your cancel/reset logic
onCancel() {
  this.form.reset();
  this.isExpanded = false;
  this.editMode = false;
}
}