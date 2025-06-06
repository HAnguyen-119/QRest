import { StaffInfoProps } from "@/constants/Types/staff";
import { TableProps, TableStatus, AdminTableProps } from "@/constants/Types/table";
import { PostOrderProps, PostPayment } from "@/constants/Types/order";
import { OrderStatus } from "@/constants/Types/order";
import { MenuItemProps } from "@/constants/Types/menuitem";
import axiosClient from "./axiosClient";
import { ReservationDataPostProps, ReservationProps } from "@/constants/Types/reservation";

export const fetchAPI = {
    getOrders: () => {
        return axiosClient.get('orders')
    },

    editOrderStatus: (id: number, status: OrderStatus) => {
        return axiosClient.patch(`orders/${id}/status`, status)
    },

    getFood: () => {
        return axiosClient.get('foods')
    },

    addMenuItem: (data: any) => {
        return axiosClient.post('foods/with-image', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    editMenuItem: (id: number, data: any) => {
        return axiosClient.put(`foods/with-image/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    deleteMenuItem: (id: number) => {
        return axiosClient.delete(`foods/${id}`);
    },

    getCategories: () => {
        return axiosClient.get('categories')
    },

    postOrder: (data: PostOrderProps) => {
        return axiosClient.post('orders', data)
    },

    postPayment: (data: PostPayment | null) => {
        return axiosClient.post('/payments', data)
    },

    getStaff: () => {
        return axiosClient.get('staffs')
    },

    addStaff: (data: any) => {
        return axiosClient.post('staffs/with-image', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    editStaff: (id: number, data: any) => {
        return axiosClient.put(`staffs/with-image/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    deleteStaff: (id: number) => {
        return axiosClient.delete(`staffs/${id}`);
    },

    getTables: () => {
        return axiosClient.get('restaurant_tables')
    },

    addTable: (data: AdminTableProps) => {
        return axiosClient.post('restaurant_tables', data);
    },

    editTable: (id: number, data: AdminTableProps) => {
        return axiosClient.put(`restaurant_tables/${id}`, data);
    },
    deleteTable: (id: number) => {
        return axiosClient.delete(`restaurant_tables/${id}`);
    },

    getCombos: () => {
        return axiosClient.get('combos')
    },

    putTableByID: (id: number) => {
        return axiosClient.put(`restaurant_tables/${id}`)
    },

    putTableStatusByID: (id: number, status: TableStatus) => {
        return axiosClient.put(`restaurant_tables/${id}/status/${status}`)
    },
    getReservations: () => {
        return axiosClient.get('reservations')
    },
    getOrderByID: (id: number) => {
        return axiosClient.get(`orders/${id}`)
    },
    getCompletedOrders: () => {
        return axiosClient.get('orders/completed')
    },
    getPendingOrders: () => {
        return axiosClient.get('orders/completed/without-payment')
    },
    getDailyPayment: (date: Date) => {
        return axiosClient.get('/payments/revenue/paymentList', {
            params: { date }
        });
    },
    getMonthlyData: (date: Date) => {
        return axiosClient.get('/payments/revenue/monthly', {
            params: { date },
        });
    },
    getQuarterlyData: (date: Date) => {
        return axiosClient.get('/payments/revenue/quarterly', {
            params: { date },
        });
    },
    getYearlyData: (date: Date) => {
        return axiosClient.get('/payments/revenue/yearly', {
            params: { date },
        });
    },
    getAllPayments: () => {
        return axiosClient.get('/payments')
    },
    getReservationByID: (id: number) => {
        return axiosClient.get(`/reservations/${id}`)
    },

    postReservation: (data: ReservationDataPostProps) => {
        return axiosClient.post('/reservations', data)
    },

    putReservationById: (id: number, data: ReservationProps) => {
        return axiosClient.put(`/reservations/${id}`, data)
    }


}
