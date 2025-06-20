export interface Loan {
    id?: string;
    customerId: string;
    amount: number;
    term?: number;
    type?: string;
}