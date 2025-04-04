import { ROUTES } from "@/constants/routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { View, Button } from "react-native";

export default function Header() {
    const router = useRouter()
    const handleLogout = async (event: { preventDefault: () => void; }) => {
            event.preventDefault()
            await AsyncStorage.removeItem('user'); 
            router.replace(ROUTES.login);
        }
    return (
        <View>
            <Button title="Log out" onPress={handleLogout}/>
        </View>
    )
}