import { Ionicons } from "@expo/vector-icons";
import { ROUTES } from "./routes";
import { GestureResponderEvent, ImageSourcePropType } from "react-native";
import Animated from "react-native";
import { InterpolateConfig } from "react-native-reanimated";

export type TableStatus = 'reserved' | 'occupied' | 'available' | 'unknown'

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
    role: string
}

export type role = 'admin' | 'staff' | 'cashier' | 'chef'

export type UserDashboard = '/admin/dashboard' | '/cashier/dashboard' | '/chef/dashboard' | '/staff/dashboard'

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
    height: number
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
