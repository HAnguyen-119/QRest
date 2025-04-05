import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import {styles} from "@/assets/styles/admin/Admin.styles"
import { View, Text } from "react-native";

export default function Dashboard() {    
    return (
        <View>
            <Text style={styles.text}>Dashboard</Text>
        </View>
    )
}