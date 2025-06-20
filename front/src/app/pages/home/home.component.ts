import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';

import { AplazoButtonComponent } from '@apz/shared-ui/button';

import { AppState } from '../../store';
import { Loan, LoanPaymentPlan } from '../../interfaces';

@Component({
  standalone: true,
  selector: 'app-home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html',
  imports: [
    ReactiveFormsModule,
    AplazoButtonComponent,
    CurrencyPipe
  ]
})
export class HomeComponent {
  readonly #http = inject(HttpClient);
  readonly store = inject(Store<AppState>);

  customerId: string;

  paymentPlan: LoanPaymentPlan;

  readonly loanForm = new FormGroup({
    amount: new FormControl<number>(1000, { nonNullable: true }),
    term: new FormControl<number>(6, { nonNullable: true }),
  });

  availableCreditLineAmount = 20000;


  get amount() {
    return this.loanForm.get('amount')?.value;
  }

  ngOnInit(): void {
    this.store.select('customer').pipe(
      take(1)).subscribe(customer => {
        this.availableCreditLineAmount = customer.availableCreditLineAmount;
        this.customerId = customer.id;
      });
  }

  newLoan() {
    if (this.loanForm.invalid) return;

    const { amount } = this.loanForm.value;
    const data = { customerId: this.customerId, amount };

    this.#http.post<Loan>('http://localhost:3000/v1/loans', data).subscribe(res => {
      alert(`Se ha hecho un préstamo por ${amount?.toFixed(2)}`);
      this.paymentPlan = res.paymentPlan;
    });
  }

}
