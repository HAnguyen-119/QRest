import { Ionicons } from "@expo/vector-icons";
import { ROUTES } from "./routes";
import { Animated, GestureResponderEvent, ImageSourcePropType } from "react-native";
import { InterpolateConfig } from "react-native-reanimated";

export type TableStatus = 'reserved' | 'occupied' | 'available' | 'unknown'
export type CustomerTitle = 'MR' | 'MRS'
export type GetData = 'orders' | 'foods' | 'categories'

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

//category props

export interface CategoryProps {
    description: string,
    id: number,
    name: string
}

export interface MenuItemProps {
    category: CategoryProps,
    description: string,
    id: number,
    imageUrl: string,
    name: string,
    price: number,
    quantity: number
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

export interface RestaurantTable {
  id: number;
  name: string;
  capacity: number;
  available: boolean;
}

export interface Order {
  id: number;
  totalPrice: number;
  note: string | null;
  orderStatus: string;
  orderTime: string;
  foodOrders: FoodOrder[];
  comboOrders: ComboOrder[];
  restaurantTable: RestaurantTable;
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

export interface RestaurantTableProps {
    id: number, 
    name: string,
    capacity: number,
    available: boolean
}

export interface ReservationProps {
    id: number,
    bookingTime: Date,
    arrivalTime: Date,
    numberOfGuests: number,
    deposit: number, 
    customer: CustomerOrderProps,
    restaurantTable: RestaurantTableProps,
    confirmed: boolean,
}

export interface OrderProps {
    note: string,
    foodOrderItems: OrderItemProps[],
    comboOrderItems: OrderItemProps[],
    restaurantTable: RestaurantTableProps,
    reservation: ReservationProps,
}

export interface UtilsPriceProps {
    data: MenuItemProps[],
    id: number,
    quantity: number
}

export interface OrderListViewProps {
    orderList: OrderItemProps[] | null,
    menuData: MenuItemProps[]
}
