import { OrderProps } from "./order"
import { Payment } from "./payment"

export type StatisticType = 'food' | 'user' | 'order' | 'table' | 'payment' | 'staff'

export type FooterType = 'order' | 'payment'

export type PeriodType = 'DAILY' | 'MONTHLY' | 'QUARTERLY' | 'YEARLY'

export interface StatisticProps {
    type: StatisticType
}

export interface FooterStatisticProps {
    type: StatisticType
    orderData: OrderProps[]
    paymentData: Payment[]
}

export interface DailyDataProps {
    endDate: Date
    periodType: PeriodType
    startDate: Date
    totalRevenue: number
}