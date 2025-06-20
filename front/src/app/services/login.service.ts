import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

import { Credentials } from '../entities/credentials';
import { ROUTE_CONFIG } from '../config/routes.config';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  readonly #router = inject(Router);
  readonly #http = inject(HttpClient);

  login(credentials: Credentials) {
    return this.#http.post('http://localhost:3000/auth/login', credentials)
    .pipe(
      tap(res => {

      })
    );
  }
}
