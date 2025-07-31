import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SignUpService } from '../services/signUp/sign-up.service';

export const orderGuardGuard: CanActivateFn = (route, state) => {
  const singUpService = inject(SignUpService);
  const router = inject(Router);

  const userLogin = singUpService.get('otpVerified');
  if (!userLogin) {
    router.navigate(['/login']);
    return false
  }
  return true;
};
