import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { SignUpService } from '../services/signUp/sign-up.service';

export const userLoginedGuard: CanActivateFn = (route, state) => {
  const singUpService = inject(SignUpService);
  const userVerified = singUpService.get('otpVerified')
  if(userVerified){
    return false
  }
  return true;
};
