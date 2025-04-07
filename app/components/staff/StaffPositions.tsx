import {TouchableOpacity, View, Text} from "react-native";
import {styles} from "@/assets/styles/admin/Admin.styles";
import StaffPosition from "@/app/components/staff/StaffPosition";


// @ts-ignore
export default function StaffPositions({handlePosition}) {
    return (
        <View style={styles.menuCategories}>
            <StaffPosition content="All" handlePress={handlePosition} />
            <StaffPosition content="Chef" handlePress={handlePosition} />
            <StaffPosition content="Waiter" handlePress={handlePosition} />
            <StaffPosition content="Cashier" handlePress={handlePosition} />
        </View>
    )
}