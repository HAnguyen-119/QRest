export type RevenueType = 'daily' | 'monthly' | 'quarterly' | 'yearly' | null

// Định nghĩa interface cho dữ liệu từ backend
export interface BackendRevenueData {
    startDate: string;
    endDate: string;
    totalRevenue: number;
    periodType: string;
}

// Định nghĩa interface cho dữ liệu frontend sử dụng
export interface RevenueData {
    totalAmount: number;
    periodStart: string;
    periodEnd: string;
}

export interface RevenueDetailsProps {
    type: RevenueType
    data: RevenueData | null
    visible: boolean
    setVisible: (visible: boolean) => void
}

export interface RevenueCardProps {
    type: RevenueType
    date: Date
    setType: (type: RevenueType) => void
    setVisible: (visible: boolean) => void
}