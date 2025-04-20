import { Ionicons } from "@expo/vector-icons";
import { ROUTES } from "./routes";
import { Animated, GestureResponderEvent, ImageSourcePropType } from "react-native";
import { InterpolateConfig } from "react-native-reanimated";
import { ReactNode } from "react";

export type TableStatus = 'RESERVED' | 'OCCUPIED' | 'AVAILABLE'
export type CustomerTitle = 'MR' | 'MRS'
export type GetData = 'orders' | 'foods' | 'categories' | 'tables' | 'combos'

export interface Children {
    children: ReactNode
}

export interface Route {
    name: string;
    title: string;
    icon: keyof typeof Ionicons.glyphMap;
}

export interface Login {
    username: string,
    password: string,
}

export interface Authentication {
    username: string,
    password: string,
    role: role
}

export type role = 'admin' | 'waiter' | 'cashier' | 'chef'

export type UserDashboard = '/admin/dashboard' | '/cashier/dashboard' | '/chef/dashboard' | '/waiter/dashboard'

export interface ButtonNav {
    onPress: (event: GestureResponderEvent) => void;
    onLongPress?: (event: GestureResponderEvent) => void;
    isFocused: boolean;
    label: string;
    icon: JSX.Element;
}

export interface ToggleType {
    src: ImageSourcePropType,
    width: number,
    height: number,
    count: number | null,
}

//theme context
export interface ThemeContextProps {
    isDark: boolean,
    toggle: () => void
}

export interface TextContextProps {
    fontFamily: string
}

//category props

export interface CategoryProps {
    description: string,
    id: number,
    name: string
}

export interface MenuItemProps {
    category: CategoryProps,
    description: string,
    imageUrl: string,
    name: string,
    price: number,
    quantity: number // sucks
}

export interface MenuItemIDProps {
    id: number
    category: CategoryProps,
    description: string,
    imageUrl: string,
    name: string,
    price: number,
    quantity: number // sucks
}

export interface ScrollContextType {
    scrollY: Animated.Value
    translateY: Animated.AnimatedInterpolation<string | number>;
}

// export interface AnimationProps {
//     src: string | AnimationObject | undefined,
// }

export interface OrderItemProps {
    id: number,
    quantity: number,
    category: string
}

export interface TableProps {
    capacity: number,
    id: number,
    name: string,
    status: string
}

export interface AdminTableProps {
    capacity: number,
    name: string,
    status: string
}

export interface RestaurantTableProps {
    id: number, 
    name: string,
    capacity: number,
    available: boolean
}

export interface CustomerOrderProps {
    id: number,
    customerTitle: CustomerTitle,
    firstname: string,
    lastname: string,
    phone: string,
}

export interface ReservationProps {
    id: number,
    bookingTime: Date,
    arrivalTime: Date,
    numberOfGuests: number,
    deposit: number, 
    customer: CustomerOrderProps,
    tableOrders: RestaurantTableProps[],
    confirmed: boolean,
}

export interface OrderProps {
    note: string | null,
    foodOrderItems: OrderItemProps[] | null,
    comboOrderItems: OrderItemProps[] | null,
    restaurantTableIds: number[],
    reservationId: number | null,
}



export interface UtilsPriceProps {
    data: MenuItemIDProps[],
    id: number,
    quantity: number
}

export interface OrderListViewProps {
    orderList: OrderItemProps[] | null,
    menuData: MenuItemIDProps[]
}

export interface StaffInfoProps {
    fullName: string
    dob: string
    phoneNumber: string
    address: string
    salary: number
    position: string,
    imageUrl: string,
}

export interface MenuItemOrderProps {
    data: MenuItemIDProps,
    quantity: number,
    handleChange: (id: number, isAdd: boolean, isDelete: boolean, category: string) => void
}

// export interface ComboFood {
//     id: number;
//     name: string,
//     description: string,
//     price: number,
//     comboFoods: Food[];
//   }

// selectgroupoption props
export interface SelectGroupProps {
    options: number[] ,
    selectedValue: number,
    onSelect: (value: number) => void
}