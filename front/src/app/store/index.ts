import { ActionReducerMap } from '@ngrx/store';
import { customerReducer } from './customer/customer.reducer';
import { loanReducer } from './loan/loan.reducer';
import { Customer } from './customer/customer.model';
import { Loan } from './loan/loan.model';

export interface AppState {
    customer: Customer | null;
    loan: Loan | null;
}

export const reducers: ActionReducerMap<AppState> = {
    customer: customerReducer,
    loan: loanReducer
};