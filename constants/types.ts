import { Ionicons } from "@expo/vector-icons";
import { ROUTES } from "./routes";

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
