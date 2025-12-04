import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common'; // Added CommonModule just in case
import { AuthService } from '../../../services/auth.service';
import { UserDetails } from '../../../models/user.model';
import { User } from '../../../services/user';

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
  user: UserDetails = {
    _id: '',
    username: '',
    bio: '',
    role: '',
    isActive: false,
    createdAt: '',
    updatedAt: '',
    socialLinks: {
      twitter: '',
      linkedin: '',
      github: '',
      website: ''
    }
  }


  constructor(private router: Router, private auth: AuthService,private userService: User) {}

  get isGuest(): boolean {
    return !this.auth.isLoggedIn();
  }

  ngOnInit(): void {
    if (this.isGuest) {
      // Set default Guest data
      this.user = 
      {
        _id: '',
        username: 'Guest User',
        bio: 'Please log in to view profile details.',
        role: 'guest',
        isActive: false,
        createdAt: '',
        updatedAt: '',
        socialLinks: {
          twitter: '', 
          linkedin: '',
          github: '',
          website: ''
        }
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
    this.userService.getProfile().subscribe((profile: any) => {
      // Update user object with fetched data
      console.log(profile.user);
      this.user = profile.user as UserDetails;
    });

  }

  goToProfile() {
    if (this.isGuest) {
      this.router.navigate(['/login']); // Redirect guest to login
    } else {
      this.router.navigate(['/profile']);
    }
  }
}