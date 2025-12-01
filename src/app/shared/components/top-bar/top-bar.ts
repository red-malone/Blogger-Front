import { Component, Input } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './top-bar.html',
  styleUrls: ['./top-bar.scss']
})
export class TopBarComponent {
  @Input() isLoggedIn: boolean = false;
}