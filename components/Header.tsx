import { ROUTES } from "@/constants/routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import {View, Text, TouchableOpacity} from "react-native";
import {StyleSheet} from "react-native";
import {COLORS} from "@/constants/colors";
import Logo from "@/components/Logo";

export default function Header() {
    const router = useRouter()
    const handleLogout = async (event: { preventDefault: () => void; }) => {
            event.preventDefault()
            await AsyncStorage.removeItem('user'); 
            router.replace(ROUTES.login);
        }
    return (
        <View style={styles.container}>
            <Logo/>
            <TouchableOpacity onPress={handleLogout} style={styles.button}>
                <Text style={styles.text}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: COLORS.primary,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end"
    },

    button: {
        height: "100%",
        width: 70,
        alignItems: "center",
        justifyContent: "center",
    },

    text: {
        fontFamily: "Josefin-Sans",
        color: COLORS.light
    }
})