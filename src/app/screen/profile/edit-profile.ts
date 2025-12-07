import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { User } from '../../services/user';
import { UserDetails } from '../../models/user.model';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
  templateUrl: './edit-profile.html',
  styleUrls: ['./edit-profile.scss']
})
export class EditProfileComponent implements OnInit, OnChanges {
  @Input() user!: UserDetails;
  @Output() saved = new EventEmitter<UserDetails>();
  @Output() cancel = new EventEmitter<void>();

  form: any;

  constructor(private fb: FormBuilder, private userService: User) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      bio: [''],
      website: [''],
      twitter: [''],
      linkedin: [''],
      github: ['']
    });
    if (this.user) this.patchFromUser();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.form) {
      this.patchFromUser();
    }
  }

  private patchFromUser() {
    if (this.user) {
      this.form.patchValue({
        bio: this.user.bio || '',
        website: this.user.socialLinks.website || '',
        twitter: this.user.socialLinks.twitter || '',
        linkedin: this.user.socialLinks.linkedin || '',
        github: this.user.socialLinks.github || ''
      });
    }
  }

  submit() {
    if (this.form.invalid) return;
    const payload = {
      bio: this.form.value.bio,
      socialLinks: {
        website: this.form.value.website || '',
        twitter: this.form.value.twitter || '',
        linkedin: this.form.value.linkedin || '',
        github: this.form.value.github || ''
      }
    };

    this.userService.editProfile(payload).subscribe((res: any) => {
      // expect the API to return updated user
      const updated = res?.user || { ...this.user, ...payload } as UserDetails;
      this.saved.emit(updated as UserDetails);
    }, () => {
      // on error, still emit local update so UI reflects change
      const updated = { ...this.user, bio: payload.bio, socialLinks: payload.socialLinks } as UserDetails;
      this.saved.emit(updated);
    });
  }

  onCancel() {
    this.cancel.emit();
  }
}
