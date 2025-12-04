import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss'
})
export class AuthComponent implements OnInit {
  form!: FormGroup;

  mode: 'login' | 'signup' = 'login';
  loading = false;
  error: string | null = null;
  private returnUrl: string | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // create username control (validators applied dynamically for signup)
    this.form = this.fb.group({
      username: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    const path = this.route.snapshot.routeConfig?.path || '';
    if (path.includes('signup')) this.mode = 'signup';
    else this.mode = 'login';
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');

    // ensure username validators reflect the current mode
    this.updateUsernameValidators();
  }

  private updateUsernameValidators() {
    const ctrl = this.form.get('username');
    if (!ctrl) return;
    if (this.mode === 'signup') {
      ctrl.setValidators([Validators.required]);
    } else {
      ctrl.clearValidators();
    }
    ctrl.updateValueAndValidity();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = null;

    const { username, email, password } = this.form.value as { username: string; email: string; password: string };

    if (this.mode === 'login') {
      this.auth.login({ email, password }).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigateByUrl(this.returnUrl || '/home');
        },
        error: (err) => {
          this.loading = false;
          this.error = err?.message || 'Login failed';
        }
      });
    } else {
      this.auth.signup({ username, email, password }).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigateByUrl(this.returnUrl || '/home');
        },
        error: (err) => {
          this.loading = false;
          this.error = err?.message || 'Signup failed';
        }
      });
    }
  }

  switchMode(): void {
    this.mode = this.mode === 'login' ? 'signup' : 'login';
    this.error = null;
    this.form.reset();
    this.updateUsernameValidators();
  }
}
