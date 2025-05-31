export type StatisticType = 'food' | 'combo' | 'order' | 'table' | 'payment' | 'staff'

export interface StatisticProps {
    type: StatisticType
}