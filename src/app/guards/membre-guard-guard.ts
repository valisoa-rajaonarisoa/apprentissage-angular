import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth-service';
import { inject } from '@angular/core';

export const membreGuardGuard: CanActivateFn = (route, state) => {
  //1 - injection du authService pour recuerer le user
  const authService = inject(AuthService);

  // 2 - router pour redirection
  const router = inject(Router);

  console.log(' ************ USER ', authService.user());
  //verification l'user
  if (authService.user() == null || authService.user() == undefined) {
    //on redirige l'user vers le login
    router.navigate(['login']);
  }
  return true;
};
