import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AplazoLogoComponent } from '@apz/shared-ui/logo';
import { AplazoButtonComponent } from '@apz/shared-ui/button';

import { ROUTE_CONFIG } from '../../config/routes.config';
import { ICustomerResponse } from '../../interfaces';
import { setCustomer } from '../../store/customer';
import { FormInputComponent, FormSelectComponent } from '../../components';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [`
    .apz-form {
      width: 100%;
      max-width: 375px;
    }
  `],
  imports: [
    ReactiveFormsModule,
    AplazoButtonComponent,
    AplazoLogoComponent,
    FormInputComponent,
    FormSelectComponent],
})
export class RegisterComponent {
  readonly #router = inject(Router);
  readonly #http = inject(HttpClient);
  readonly #store = inject(Store);

  /** Formulario de registro */
  readonly form = new FormGroup({
    firstName: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    lastName: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    secondLastName: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    dateOfBirth: new FormControl<Date>(new Date(), { nonNullable: true, validators: [Validators.required] }),
    gender: new FormControl<string>(''),
    birthState: new FormControl<string>(''),
    curp: new FormControl<string>('', Validators.compose([Validators.minLength(18), Validators.maxLength(18)])),
  });

  /** Géneros disponibles */
  genders = [
    { value: 'M', label: 'Masculino' },
    { value: 'F', label: 'Femenino' },
  ];

  /** Estados de México */
  mexicoStates = [
    { value: 'AGU', label: 'Aguascalientes' },
    { value: 'BCN', label: 'Baja California' },
    { value: 'BCS', label: 'Baja California Sur' },
    { value: 'CAM', label: 'Campeche' },
    { value: 'CHP', label: 'Chiapas' },
    { value: 'CHH', label: 'Chihuahua' },
    { value: 'COA', label: 'Coahuila' },
    { value: 'COL', label: 'Colima' },
    { value: 'DF', label: 'Ciudad de México' },
    { value: 'DUR', label: 'Durango' },
    { value: 'GUA', label: 'Guanajuato' },
    { value: 'GRO', label: 'Guerrero' },
    { value: 'HID', label: 'Hidalgo' },
    { value: 'JAL', label: 'Jalisco' },
    { value: 'MEX', label: 'Estado de México' },
    { value: 'MN', label: 'Michoacán' },
    { value: 'MOR', label: 'Morelos' },
    { value: 'NAY', label: 'Nayarit' },
    { value: 'NLE', label: 'Nuevo León' },
    { value: 'OAX', label: 'Oaxaca' },
    { value: 'PUE', label: 'Puebla' },
    { value: 'QUE', label: 'Querétaro' },
    { value: 'ROO', label: 'Quintana Roo' },
    { value: 'SLP', label: 'San Luis Potosí' },
    { value: 'SIN', label: 'Sinaloa' },
    { value: 'SON', label: 'Sonora' },
    { value: 'TAB', label: 'Tabasco' },
    { value: 'TAM', label: 'Tamaulipas' },
    { value: 'TLA', label: 'Tlaxcala' },
    { value: 'VER', label: 'Veracruz' },
    { value: 'YUC', label: 'Yucatán' },
    { value: 'ZAC', label: 'Zacatecas' },
  ];

  register(): void {
    if (this.form.invalid) return

    const data = this.form.value;
    // Aseguramos que la fecha sea un objeto Date
    data.dateOfBirth = new Date(data.dateOfBirth as string | Date);

    const today = new Date();
    const adultAge = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    // Verificar si la fecha de nacimiento es mayor a 18 años
    // Si la fecha de nacimiento es mayor a la fecha de hoy menos 18 años,
    if (data.dateOfBirth.getTime() > adultAge.getTime()) {
      alert('Debes ser mayor de edad para registrarte');
      return;
    }

    this.#http.post<ICustomerResponse>('http://localhost:3000/v1/customers', data).subscribe(res => {
      this.#store.dispatch(setCustomer({ customer: res }));
      this.#router.navigate([ROUTE_CONFIG.app, ROUTE_CONFIG.home]);
    });

    // Aquí puedes manejar el registro, por ejemplo enviando los datos a un servicio
    console.log('Registro exitoso:', this.form.value);
  }

}
