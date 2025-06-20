import { createAction, props } from '@ngrx/store';
import { Loan } from './loan.model';

export const setLoan = createAction(
    '[Loan] Set Loan',
    props<{ loan: Loan }>()
);

export const clearLoan = createAction('[Loan] Clear Loan');