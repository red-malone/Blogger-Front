import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BlogCardComponent } from '../../shared/components/blog-card/blog-card';
import { EditProfileComponent } from './edit-profile';
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
    EditProfileComponent,
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
  editing = false;
  constructor(private userService: User, private blogService: Blog) {}

  toggleEdit() { this.editing = !this.editing; }

  onProfileSaved(updated: UserDetails) {
    this.user = updated;
    this.editing = false;
  }

  openLink(link?: string, label?: string) {
    const msgAdd = `No ${label ?? 'link'} set. Click Edit Profile to add one.`;
    if (!link) { try { window.alert(msgAdd); } catch {} return; }
    let url = link;
    if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
    try { window.open(url, '_blank'); } catch { window.alert('Unable to open link'); }
  }


  ngOnInit(): void {
    // Fetch user profile data here
    this.userService.getProfile().subscribe((profile: any) => {
      // Update user object with fetched data
      this.user = profile.user as UserDetails;
    });

    // Provide the blogs Observable directly to the template so the async pipe
    // receives a proper Observable (avoid subscribing and assigning the raw
    // array which breaks the async pipe).
    this.blogs$ = this.blogService.getBlog();
  }
}