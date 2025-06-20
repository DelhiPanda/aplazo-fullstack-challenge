import { createReducer, on } from '@ngrx/store';
import { setLoan, clearLoan } from './loan.actions';
import { Loan } from './loan.model';

export const initialState: Loan | null = null;

export const loanReducer = createReducer<Loan | null>(
    initialState,
    on(setLoan, (state, { loan }) => loan),
    on(clearLoan, () => null)
);