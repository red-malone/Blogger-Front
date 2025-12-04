import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isLoggedIn()) {
    // if token expired, force logout and redirect to login with a message
    if (auth.isTokenExpired()) {
      auth.logout();
      // alert the user to login again
      try { window.alert('Session expired. Please log in again.'); } catch {}
      return router.parseUrl(`/login?returnUrl=${encodeURIComponent(state.url)}`);
    }
    return true;
  }
  return router.parseUrl(`/login?returnUrl=${encodeURIComponent(state.url)}`);
};
