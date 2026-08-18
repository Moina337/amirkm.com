import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.isAuthenticated().pipe(
    tap((isAuth) => {
      if (!isAuth) router.navigate(['/admin/login']);
    }),
    map((isAuth) => isAuth)
  );
};