import { OrderItemProps } from "@/constants/types";

export const CountOrders = (orderList: OrderItemProps[], comboList: OrderItemProps[]) => {
    if (orderList.length === 0 && comboList.length === 0) {
        return null
    }
    let count = 0
    for (let i = 0; i < orderList.length; i++) {
        count += orderList[i].quantity
    }
    for (let i = 0; i < comboList.length; i++) {
        count += comboList[i].quantity
    }
    return count
}