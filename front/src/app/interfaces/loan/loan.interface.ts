export interface LoanPaymentPlan {
    commissionAmount: number,
    installments: {
        amount: number,
        scheduledPaymentDate: string,
        status: 'NEXT' | 'PENDING'
    }[]
}

export interface Loan {
    id: string,
    customerId: string,
    status: string,
    createdAt: string,
    paymentPlan: LoanPaymentPlan;
}