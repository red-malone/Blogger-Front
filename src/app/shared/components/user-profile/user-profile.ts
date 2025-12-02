import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common'; // Added CommonModule just in case
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    MatDividerModule
  ],
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.scss']
})
export class UserProfileComponent implements OnInit {
  
  // Default structure to prevent template errors before data loads
  user = {
    name: '',
    bio: '',
    followers: 0,
    following: 0,
    posts: 0
  };

  constructor(private router: Router, private auth: AuthService) {}

  get isGuest(): boolean {
    return !this.auth.isLoggedIn();
  }

  ngOnInit(): void {
    if (this.isGuest) {
      // Set default Guest data
      this.user = {
        name: 'Guest User',
        bio: 'Please log in to view your stats and profile details.',
        followers: 0,
        following: 0,
        posts: 0
      };
    } else {
      // If logged in, fetch the actual data
      this.loadUserData();
    }
  }

  loadUserData() {
    // ============================================================
    //  👇 WRITE YOUR LOGIC HERE (API Calls / Service Subscriptions)
    // ============================================================
    
    // Example:
    // this.userService.getUserProfile().subscribe(data => {
    //   this.user = data;
    // });

    // Mock data for now:
    this.user = {
      name: 'John Doe',
      bio: 'Passionate writer and storyteller',
      followers: 120,
      following: 85,
      posts: 24
    };
  }

  goToProfile() {
    if (this.isGuest) {
      this.router.navigate(['/login']); // Redirect guest to login
    } else {
      this.router.navigate(['/profile']);
    }
  }
}