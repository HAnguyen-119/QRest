export type RevenueType = 'daily'| 'monthly' | 'quarterly' | 'yearly' | null

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