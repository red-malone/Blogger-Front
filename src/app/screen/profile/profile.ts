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

//sample user object
// {
//     "socialLinks": {
//         "twitter": "",
//         "linkedin": "",
//         "github": "",
//         "website": ""
//     },
//     "_id": "69257243ec332296a6fad4c0",
//     "username": "red-malone",
//     "bio": "",
//     "role": "user",
//     "isActive": true,
//     "createdAt": "2025-11-25T09:09:23.442Z",
//     "updatedAt": "2025-11-25T09:09:23.442Z",
//     "__v": 0
// }

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
    BlogCardComponent
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
  blogs: any[] = [];
  constructor(private userService: User, private blogService: Blog) {}
  // user = {
  //   name: 'John Doe',
  //   bio: 'Passionate writer and storyteller',
  //   followers: 120,
  //   following: 85,
  //   posts: 24,
  //   coverImage: 'https://source.unsplash.com/random/1200x300/?nature',
  //   profileImage: 'https://ui-avatars.com/api/?name=John+Doe&size=200'
  // };

  ngOnInit(): void {
    // Fetch user profile data here
    this.userService.getProfile().subscribe(profile => {
      // Update user object with fetched data
      console.log(profile)
      this.user = { ...this.user, ...profile };
    });

    //Fetch Blogs by user
    // this.blogService.getBlog().subscribe(blogs => {
    //   this.blogs = blogs;
    // });
  }
}