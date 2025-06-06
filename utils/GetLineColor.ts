import { COLORS } from "@/constants/colors"
import { RevenueType } from "@/constants/Types/revenue"

export const getLineColor = (type: RevenueType) => {
    let lineColor = ''
    switch (type) {
        case 'daily':
            lineColor = COLORS.dailyLine
            break
        case 'monthly':
            lineColor = COLORS.monthlyLine
            break
        case 'quarterly':
            lineColor = COLORS.quarterlyLine
            break
        case 'yearly':
            lineColor = COLORS.yearlyLine
            break
    }
    return lineColor
}