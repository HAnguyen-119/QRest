import {TouchableOpacity, View, Text} from "react-native";
import {createAdminStyles} from "@/assets/styles/admin/Admin.styles";
import StaffPosition from "@/components/staff/StaffPosition";
import { useThemeContext } from "@/contexts/ThemeContext";


// @ts-ignore
export default function StaffPositions({handlePosition}) {
    const { isDark } = useThemeContext()
    const adminStyles = createAdminStyles(isDark)
    return (
        <View style={adminStyles.menuCategories}>
            <StaffPosition content="All" handlePress={handlePosition} />
            <StaffPosition content="Chef" handlePress={handlePosition} />
            <StaffPosition content="Waiter" handlePress={handlePosition} />
            <StaffPosition content="Cashier" handlePress={handlePosition} />
        </View>
    )
}