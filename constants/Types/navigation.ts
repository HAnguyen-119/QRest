import { Ionicons } from "@expo/vector-icons";
import { GestureResponderEvent } from "react-native";

export type UserDashboard = '/admin/dashboard' | '/cashier/dashboard' | '/chef/dashboard' | '/waiter/dashboard'

export interface ButtonNav {
    onPress: (event: GestureResponderEvent) => void;
    onLongPress?: (event: GestureResponderEvent) => void;
    isFocused: boolean;
    label: string;
    icon: JSX.Element;
}

export interface Route {
    name: string;
    title: string;
    icon: keyof typeof Ionicons.glyphMap;
}