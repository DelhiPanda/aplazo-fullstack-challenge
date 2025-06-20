import { createReducer, on } from '@ngrx/store';
import { setCustomer, clearCustomer } from './customer.actions';
import { Customer } from './customer.model';

export const initialState: Customer | null = null;

export const customerReducer = createReducer<Customer | null>(
    initialState,
    on(setCustomer, (state, { customer }) => customer),
    on(clearCustomer, () => null)
);