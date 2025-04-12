import { OrderItemProps } from "@/constants/types";

export const CountOrders = (orderList: OrderItemProps[] | null) => {
    if (!orderList) {
        return null
    }
    let count = 0
    for (let i = 0; i < orderList.length; i++) {
        count += orderList[i].quantity
    }
    return count
}