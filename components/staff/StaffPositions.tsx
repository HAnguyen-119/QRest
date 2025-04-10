import {TouchableOpacity, View, Text} from "react-native";
import {adminStyles} from "@/assets/styles/admin/Admin.styles";
import StaffPosition from "@/components/staff/StaffPosition";


// @ts-ignore
export default function StaffPositions({handlePosition}) {
    return (
        <View style={adminStyles.menuCategories}>
            <StaffPosition content="All" handlePress={handlePosition} />
            <StaffPosition content="Chef" handlePress={handlePosition} />
            <StaffPosition content="Waiter" handlePress={handlePosition} />
            <StaffPosition content="Cashier" handlePress={handlePosition} />
        </View>
    )
}