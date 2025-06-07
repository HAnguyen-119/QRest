import { createGlobalStyles } from "@/assets/styles/Global.styles"
import { COLORS } from "@/constants/colors"
import { InputProps } from "@/constants/Types/function"
import { useThemeContext } from "@/contexts/ThemeContext"
import { View, Text, TextInput } from "react-native"

export default function Input({ text, styles, value, onChangeText, placeholder, keyboard }: InputProps) {
    const { isDark } = useThemeContext()

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {text}
            </Text>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboard ? keyboard : 'default'}
                placeholder={placeholder}
                placeholderTextColor={isDark ? COLORS.light : COLORS.dark}
            />
        </View>
    )
}