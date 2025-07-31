import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { SignUpService } from '../services/signUp/sign-up.service';

export const adminVerifiedGuard: CanActivateFn = (route, state) => {
  const singUpS = inject(SignUpService);
  const admin = singUpS.get('adminVerify');

  if (!admin) {
    return false;
  }

  return true;
};
