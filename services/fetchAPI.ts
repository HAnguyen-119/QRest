import { StaffInfoProps } from "@/constants/Types/staff";
import { TableProps, TableStatus, AdminTableProps } from "@/constants/Types/table";
import { PostOrderProps } from "@/constants/Types/order";
import { OrderStatus } from "@/constants/Types/order";
import { MenuItemProps } from "@/constants/Types/menuitem";
import axiosClient from "./axiosClient";

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

    addMenuItem: (data: MenuItemProps) => {
        return axiosClient.post('foods', data);
    },

    editMenuItem: (id: number, data: MenuItemProps) => {
        return axiosClient.put(`foods/${id}`, data);
    },

    deleteMenuItem: (id: number) => {
        return axiosClient.delete(`foods/${id}`);
    },

    getCategories: () => {
        return axiosClient.get('categories')
    },

    postOrder: (data: PostOrderProps | null) => {
        return axiosClient.post('orders', data)
    },

    getStaff: () => {
        return axiosClient.get('staffs')
    },

    addStaff: (data: StaffInfoProps) => {
        return axiosClient.post('staffs', data);
    },

    editStaff: (id: number, data: StaffInfoProps) => {
        return axiosClient.put(`staffs/${id}`, data);
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
    }


}
