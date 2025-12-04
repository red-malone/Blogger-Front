import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BlogCardComponent } from '../../shared/components/blog-card/blog-card';
import { User } from '../../services/user';
import { Blog } from '../../services/blog';
import { UserDetails } from '../../models/user.model';
import { NoBlog } from "../../shared/components/no-blog/no-blog";
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    BlogCardComponent,
    NoBlog,
    CommonModule
],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class ProfileComponent implements OnInit {
  user: UserDetails={
    _id: '',
    username: '',
    bio: '',
    socialLinks: {
      twitter: '',
      linkedin: '',
      github: '',
      website: ''
    },
    role: '',
    isActive: false,
    createdAt: '',
    updatedAt: ''
  };
  blogs$: Observable<any[]> = new Observable();
  constructor(private userService: User, private blogService: Blog) {}


  ngOnInit(): void {
    // Fetch user profile data here
    this.userService.getProfile().subscribe((profile: any) => {
      // Update user object with fetched data
      console.log(profile.user);
      this.user = profile.user as UserDetails;
    });

    // Fetch Blogs by user
    this.blogService.getBlog().subscribe(blogs => {
      this.blogs$ = blogs;
      console.log("Stored blogs",this.blogs$)
    });
  }
}