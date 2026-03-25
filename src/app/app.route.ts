import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Membre } from './pages/membre/membre';
import { Home } from './pages/home/home';
import { membreGuardGuard } from './guards/membre-guard-guard';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'register',
    component: Register,
  },
  {
    path: '',
    component: Home,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'membre',
    component: Membre,
    canActivate: [membreGuardGuard], //proteger le route
  },
];
