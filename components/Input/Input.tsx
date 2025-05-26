import { InputProps } from "@/constants/Types/function"
import { View, Text, TextInput } from "react-native"

export default function Input({ text, styles, value, onChangeText, placeholder, keyboard }: InputProps) {
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
            />
        </View>
    )
}