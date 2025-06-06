import { RevenueType } from "@/constants/Types/revenue";

export const GetRevenueTitle = (type: RevenueType) => {
    let lineText = ''
    switch (type) {
        case 'daily':
            lineText = 'Daily Income'
            break
        case 'monthly':
            lineText = 'Monthly Income'
            break
        case 'quarterly':
            lineText = 'Quarterly Income'
            break
        case 'yearly':
            lineText = 'Yearly Income'
            break
    }
    return lineText
}