import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-no-blog',
  imports: [MatCardModule],
  templateUrl: './no-blog.html',
  styleUrl: './no-blog.scss',
})
export class NoBlog {

  @Input() page!: String ;
}
