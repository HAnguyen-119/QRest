import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import {adminStyles} from "@/assets/styles/admin/Admin.styles"
import { View, Text } from "react-native";

export default function Dashboard() {    
    return (
        <View>
            <Text style={adminStyles.text}>Dashboard</Text>
        </View>
    )
}