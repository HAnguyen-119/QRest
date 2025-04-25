import { Ionicons } from "@expo/vector-icons";
import { ROUTES } from "./routes";
import { Animated, GestureResponderEvent, ImageSourcePropType } from "react-native";
import { InterpolateConfig } from "react-native-reanimated";
import { ReactNode } from "react";

export type TableStatus = 'RESERVED' | 'OCCUPIED' | 'AVAILABLE'
export type CustomerTitle = 'MR' | 'MRS'
export type GetData = 'orders' | 'foods' | 'categories' | 'tables' | 'combos' 
                    | 'reservations' | 'completed_orders' | 'pending_orders'
export type OrderStatus = 'PENDING' | 'PROCESSING' | 'PROCESSED' | 'COMPLETED' | 'CANCELED'

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

 // payment cua Luong
export interface Food {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    imageUrl: string;
    category: {
        id: number;
        name: string;
        description: string;
    };
}

export interface ComboFood {
  id: number;
  quantity: number | null;
  food: Food;
}

export interface Combo {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  comboFoods: ComboFood[];
}

export interface FoodOrder {
    id: number;
    quantity: number;
    price: number;
    food: Food;
}

export interface ComboOrder {
  id: number;
  quantity: number;
  price: number;
  combo: Combo;
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

// het payment cua Luong


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
    status: TableStatus
}

export interface ReservationProps {
    id: number,
    bookingTime: Date,
    arrivalTime: Date,
    numberOfGuests: number,
    deposit: number, 
    customerName: string,
    customerPhone: string,
    tableReservations: [{id: number, restaurantTable: RestaurantTableProps}],
    confirmed: boolean,
}

export interface PostOrderProps {
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
    handleChange: (id: number, isAdd: boolean, isDelete: boolean) => void
}

// selectgroupoption props
export interface SelectGroupProps {
    options: number[] ,
    selectedValue: number,
    onSelect: (value: number) => void
}

export interface OrderDetailProps {
    id: number, 
    data: OrderProps[],
    visible: boolean,
    setVisible: (visible: boolean) => void
}

export interface CashierOrderComponentProps {
    data: OrderProps[],
    setVisible: (visible: boolean) => void,
    setCurrentID: (id: number) => void
}