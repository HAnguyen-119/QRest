import { ComboItemProps, MenuItemIDProps, MenuItemProps, OrderItemProps, UtilsPriceProps } from "@/constants/types";

export const getTotalPrice = ({ data, id, quantity}: UtilsPriceProps) => {
    let price = 0
    data.map((item) => {
        if (item.id === id) {
            price = quantity * item.price
        }
    })
    return price
}

export const getOrderPrice = (orderList : OrderItemProps[], menuData: MenuItemIDProps[], combosData: ComboItemProps[]) => {
    let totalPrice = 0
    for (let i = 0; i < orderList.length; i++) {
        totalPrice += getTotalPrice({ data: orderList[i].category === 'Combo' ? combosData : menuData, id: orderList[i].id, quantity: orderList[i].quantity})
    }
    return totalPrice
}