import { OrderProps } from "./order";

export type PaymentMethod = 'IN_CASH' | 'BANK_TRANSFER'

export interface Payment {
    id: string;
    paymentTime: Date;
    totalPrice: number;
    paymentMethod: PaymentMethod;
    order: OrderProps
    invoicePdfPath: string
}