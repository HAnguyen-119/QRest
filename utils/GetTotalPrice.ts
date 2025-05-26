import { UtilsPriceProps } from "@/constants/Types/function";
import { ComboItemProps, OrderItemProps } from "@/constants/Types/order";
import { MenuItemIDProps } from "@/constants/Types/menuitem";

export const getTotalPrice = ({ data, id, quantity}: UtilsPriceProps) => {
    let price = 0
    data.map((item) => {
        if (item.id === id) {
            price = quantity * item.price
        }
    })
    return price
}

export const getOrderPrice = (orderList : OrderItemProps[], comboList: OrderItemProps[], menuData: MenuItemIDProps[], combosData: ComboItemProps[]) => {
    let totalPrice = 0
    console.log(orderList)
    console.log(comboList)
    for (let i = 0; i < orderList.length; i++) {
        totalPrice += getTotalPrice({ data: menuData, id: orderList[i].id, quantity: orderList[i].quantity }) 
    }
    for (let i = 0; i < comboList.length; i++) {
        totalPrice += getTotalPrice({ data: combosData, id: comboList[i].id, quantity: comboList[i].quantity })
    }
    return totalPrice
}