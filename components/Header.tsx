import { ROUTES } from "@/constants/routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import {View} from "react-native";
import Logo from "@/components/Logo";
import ToggleButton from "./Button/ToggleButton";
import { useThemeContext } from "@/contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { headerStyles } from "@/assets/styles/Header.styles";
export default function Header() {
    const router = useRouter()
    const handleLogout = async (event: { preventDefault: () => void; }) => {
            event.preventDefault()
            await AsyncStorage.removeItem('user'); 
            router.replace(ROUTES.login);
        }
    return (
        <View style={headerStyles.container}>
            <Logo/>
            <ToggleButton/>
            <Ionicons name="log-out-outline" size={40} onPress={handleLogout} style={headerStyles.button}/>
        </View>
    )
}
