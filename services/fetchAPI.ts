import {MenuItemProps, OrderProps} from "@/constants/types";
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

    postOrder: (data: OrderProps) => {
        return axiosClient.post('orders', data)
    }
}