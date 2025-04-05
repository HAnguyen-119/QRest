import { createRootStyles } from "@/assets/styles/Root";
import { COLORS } from "@/constants/colors";
import { useThemeContext } from "@/contexts/ThemeContext";
import { StyleSheet, Text, View } from "react-native";

export default function Dashboard() {
    const { isDark } = useThemeContext()
    const rootStyles = createRootStyles(isDark)
    return (
        <View style={rootStyles.container}>
            <Text style={styles.text}>test font</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'JosefinSans-Regular',
        fontSize: 24,
    }
})