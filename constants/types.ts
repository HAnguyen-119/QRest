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