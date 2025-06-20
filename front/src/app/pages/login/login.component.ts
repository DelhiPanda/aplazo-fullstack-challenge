import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AplazoLogoComponent } from '@apz/shared-ui/logo';
import { AplazoButtonComponent } from '@apz/shared-ui/button';

import { LoginService } from '../../services/login.service';
import { FormInputComponent } from '../../components';
import { Credentials } from '../../entities/credentials';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
    .apz-form {
      width: 100%;
      max-width: 375px;
    }
  `],
  imports: [ReactiveFormsModule, AplazoButtonComponent, AplazoLogoComponent, FormInputComponent],
})
export class LoginComponent {
  readonly #loginService = inject(LoginService);

  readonly form = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });

  login(): void {
    if (this.form.invalid) return;

    const data = this.form.value as Credentials;

    this.#loginService.login(data).subscribe();
  }
}
