import { createAction, props } from '@ngrx/store';
import { Customer } from './customer.model';

export const setCustomer = createAction(
  '[Customer] Set Customer',
  props<{ customer: Customer }>()
);

export const clearCustomer = createAction('[Customer] Clear User');