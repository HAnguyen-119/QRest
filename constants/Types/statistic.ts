import { OrderProps } from "./order"
import { Payment } from "./payment"

export type StatisticType = 'food' | 'combo' | 'order' | 'table' | 'payment' | 'staff'

export type FooterType = 'order' | 'payment'

export interface StatisticProps {
    type: StatisticType
}

export interface FooterStatisticProps {
    type: StatisticType
    orderData: OrderProps[]
    paymentData: Payment[]
}