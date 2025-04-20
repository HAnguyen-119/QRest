import { MenuItemProps, OrderProps, StaffInfoProps, TableStatus } from "@/constants/types";
import axiosClient from "./axiosClient";

export const fetchAPI = {
    getOrders: () => {
        return axiosClient.get('orders')
    },

    getFood: () => {
        return axiosClient.get('foods')
    },

    addMenuItem:(data: MenuItemProps) => {
        return axiosClient.post('foods', data);
    },

    editMenuItem:(id: number, data: MenuItemProps) => {
        return axiosClient.put(`foods/${id}`, data);
    },

    deleteMenuItem:(id: number) => {
        return axiosClient.delete(`foods/${id}`);
    },

    getCategories: () => {
        return axiosClient.get('categories')
    },

    postOrder: (data: OrderProps | null) => {
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

    getCombos: () => {
        return axiosClient.get('combos')
    },

    putTableByID: (id: number) => {
        return axiosClient.put(`restaurant_tables/${id}`)
    },

    putTableStatusByID: (id: number, status: TableStatus) => {
        return axiosClient.put(`restaurant_tables/${id}/status/${status}`)
    }

}