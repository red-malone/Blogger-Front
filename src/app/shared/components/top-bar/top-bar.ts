import { Component, Input } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../services/auth.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './top-bar.html',
  styleUrls: ['./top-bar.scss']
})
export class TopBarComponent {
  @Input() isLoggedIn: boolean = false;
  constructor(private auth: AuthService) {}

  get isGuest(): boolean {
    return !this.auth.isLoggedIn();
  }
}