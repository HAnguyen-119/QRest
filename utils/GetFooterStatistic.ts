import { OrderProps } from "@/constants/Types/order";
import { Payment } from "@/constants/Types/payment";
import { FooterStatisticProps } from "@/constants/Types/statistic";

export const GetFooterStatistic = ({ type, orderData, paymentData }: FooterStatisticProps) => {
    let footer = ''
    switch (type) {
        case 'food':
            footer = 'Keep your menu fresh and exciting!'
            break
        case 'user':
            footer = 'Manage your staff\'s accounts efficiently!'
            break
        case 'order':
            {
                const orderGrowth = parseFloat(GetOrderGrowth(orderData))
                if (orderGrowth > 0) {
                    footer = `↑ ${orderGrowth}% more orders this week!`
                } else if (orderGrowth == 0) {
                    footer = `Orders remain stable this week.`
                } else {
                    footer = `↓ ${orderGrowth}% fewer orders this week!`
                }
            }
            break
        case 'table':
            footer = 'Manage your tables for better service!'
            break
        case 'payment':
            {
                const paymentGrowth = parseFloat(GetPaymentGrowth(paymentData))
                if (paymentGrowth > 0) {
                    footer = `↑ ${paymentGrowth}% revenue growth this week!`
                } else if (paymentGrowth == 0) {
                    footer = `Revenue is stable this week.`
                } else {
                    footer = `↓ ${Math.abs(paymentGrowth)}% revenue drop this week.`
                }
            }
            break
        case 'staff':
            footer = 'Motivate your staff for higher productivity!'
            break
    }
    return footer
}

const GetOrderGrowth = (orderData: OrderProps[]) => {
    const { today, previousWeek, previous2Weeks } = GetCalculateTime()

    const thisWeekOrderData = (Object.values(orderData) as OrderProps[]).filter((order: OrderProps) => {
        const orderTime = order.orderTime
        return new Date(orderTime) < today && new Date(orderTime) >= previousWeek
    }).length

    const previousWeekOrderData = (Object.values(orderData) as OrderProps[]).filter((order: OrderProps) => {
        const orderTime = order.orderTime
        return new Date(orderTime) < previousWeek && new Date(orderTime) >= previous2Weeks
    }).length

    return GetGrowthPercent(thisWeekOrderData, previousWeekOrderData)
}

const GetPaymentGrowth = (paymentData: Payment[]) => {
    const { today, previousWeek, previous2Weeks } = GetCalculateTime()

    const thisWeekPaymentData = (Object(paymentData)).filter((payment: Payment) => {
        const paymentTime = payment.paymentTime
        return new Date(paymentTime) < today && new Date(paymentTime) >= previousWeek
    }).length

    const previousWeekPaymentData = (Object(paymentData)).filter((payment: Payment) => {
        const paymentTime = payment.paymentTime
        return new Date(paymentTime) < previousWeek && new Date(paymentTime) >= previous2Weeks
    }).length

    return GetGrowthPercent(thisWeekPaymentData, previousWeekPaymentData)
}

const GetGrowthPercent = (currentWeek: number, lastWeek: number) => {
    if (lastWeek === 0) {
        return currentWeek === 0 ? '0%' : '100%';
    }
    const percent = ((currentWeek - lastWeek) / lastWeek) * 100;
    return `${percent.toFixed(2)}%`;
}

export const GetCalculateTime = () => {
    return { 
        today: new Date(), 
        previousWeek: new Date(new Date().getTime() - 7 * 24 * 3600 * 1000), 
        previous2Weeks: new Date(new Date().getTime() - 14 * 24 * 3600 * 1000)
    }
}