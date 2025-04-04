import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { View, Button } from "react-native";

export default function Dashboard() {
    const router = useRouter()
    const handleLogout = async (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        await AsyncStorage.removeItem('user'); 
        router.replace('/(auth)/login');
    }
    return (
        <View>
            <Button title="Logout" onPress={handleLogout}/>
        </View>
    )
}