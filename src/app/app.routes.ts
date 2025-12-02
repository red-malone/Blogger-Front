import { Routes } from '@angular/router';
import { LandingScreen } from './screen/landing-screen/landing-screen';
import { Home } from './screen/home/home';
import { ProfileComponent } from './screen/profile/profile';
import { AuthComponent } from './screen/auth/auth';
import { authGuard } from './guards/auth.guard';
export const routes: Routes = [
  {
    path: '',
    component: LandingScreen,//Path to landing screen
  },
  {
    path: 'home',
    component: Home // public home - accessible to guests
  },
  {
    path: 'profile',
    component: ProfileComponent,//Path to profile screen
    canActivate: [authGuard]
  },
  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: 'signup',
    component: AuthComponent
  }
];
