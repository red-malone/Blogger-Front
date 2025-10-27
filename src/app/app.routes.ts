import { Routes } from '@angular/router';
import { LandingScreen } from './screen/landing-screen/landing-screen';
import { Home } from './screen/home/home';
export const routes: Routes = [
  {
    path: '',
    component: LandingScreen,//Path to landing screen
  },
  {
    path: 'home',
    component: Home,//Path to home screen
  },
];
