import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';

import { AppState } from '../store';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const store = inject(Store<AppState>);
  const router = inject(Router);

  return store.select('customer').pipe(
    take(1),
    map(user => {
    if (user) return true;

    return router.createUrlTree(['/auth']);
  }));
};
