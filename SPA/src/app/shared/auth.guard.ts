import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let local = localStorage.getItem('token');
  return local !== null ? true : inject(Router).createUrlTree(['/signin']);
};
