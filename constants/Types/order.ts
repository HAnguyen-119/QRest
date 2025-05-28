import { CategoryProps } from "./category";
import { MenuItemIDProps } from "./menuitem";
import { RestaurantTableProps } from "./table";

export type OrderStatus = 'PENDING' | 'PROCESSING' | 'PROCESSED' | 'COMPLETED' | 'CANCELED'
export type CustomerTitle = 'MR' | 'MRS'

export interface OrderItemProps {
    id: number,
    quantity: number,
}

export interface FoodOrder {
    id: number;
    quantity: number;
    price: number;
    food: MenuItemIDProps;
}

export interface ComboFood {
    id: number;
    quantity: number | null;
    food: MenuItemIDProps;
}

export interface ComboOrder {
    id: number;
    quantity: number;
    price: number;
    combo: ComboItemProps;
}

export interface ComboItemProps {
    id: number,
    name: string,
    category: CategoryProps,
    price: number,
    imageUrl: string,
    description: string,
    comboFoods: [{
        id: number,
        quantity: number,
        food: MenuItemIDProps
    }]
}

export interface OrderProps {
    id: number;
    totalPrice: number;
    note: string | null;
    orderStatus: OrderStatus;
    orderTime: Date;
    foodOrders: FoodOrder[];
    comboOrders: ComboOrder[];
    tableOrders: [
        {
            id: number,
            RestaurantTable: RestaurantTableProps
        }
    ];
    reservation: any | null;
}

export interface OrderDetailProps {
    id: number,
    data: OrderProps[],
    visible: boolean,
    isPayment: boolean,
    setVisible: (visible: boolean) => void
}

export interface CashierOrderComponentProps {
    data: OrderProps[],
    setVisible: (visible: boolean) => void,
    setCurrentID: (id: number) => void
}

export interface PostOrderProps {
    note: string | null,
    foodOrderItems: OrderItemProps[] | null,
    comboOrderItems: OrderItemProps[] | null,
    restaurantTableIds: number[],
    reservationId: number | null,
}

export interface PostPayment {
    orderId: number,
    paymentMethod: 'BANK_TRANSFER' | 'IN_CASH'
}

export interface OrderListViewProps {
    orderList: OrderItemProps[],
    comboList: OrderItemProps[],
    menuData: MenuItemIDProps[],
    combosData: ComboItemProps[],
    handleChange: ((id: number, isAdd: boolean, isDelete: boolean, category: string) => void) | null,

}

export interface CustomerOrderProps {
    id: number,
    customerTitle: CustomerTitle,
    firstname: string,
    lastname: string,
    phone: string,
}

export interface MenuItemOrderProps {
    data: MenuItemIDProps | ComboItemProps,
    quantity: number,
    handleChange: ((id: number, isAdd: boolean, isDelete: boolean, category: string) => void) | null,
    isComboItem: boolean
}

export interface ComboViewProps {
    item: OrderItemProps,
    menuItem: ComboItemProps,
    handleChange: ((id: number, isAdd: boolean, isDelete: boolean, category: string) => void) | null 
}