import { Routes } from '@angular/router';
import { LandingScreen } from './screen/landing-screen/landing-screen';
import { Home } from './screen/home/home';
import { ProfileComponent } from './screen/profile/profile';
export const routes: Routes = [
  {
    path: '',
    component: LandingScreen,//Path to landing screen
  },
  {
    path: 'home',
    component: Home,//Path to home screen
  },
  {
    path: 'profile',
    component: ProfileComponent,//Path to profile screen
  },
];
