import { validateLogin } from "@/utils/ValidateLogin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, {useState} from "react";
import {View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Image} from "react-native";

import { role } from "@/constants/Types/authentication";
import {COLORS} from "@/constants/colors";

export default function Login() {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const router = useRouter()
    const handleLogin = async () => {
        const user = validateLogin({username, password})
        if (user) {
            const role = user.role as role
            await AsyncStorage.setItem('user', JSON.stringify(user))
            router.push(`/${role}/dashboard`)
        } else {
            Alert.alert('Login Failed', 'Invalid username or password')
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.background}></View>
            <Image
                source={require('@/assets/images/restaurant.png')}
                resizeMode="contain"
                style={styles.logo}
            />
            <View style={styles.content}>
                <Text style={styles.title}>QREST</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TouchableOpacity onPress={handleLogin} style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
            <Image
                source={require('@/assets/images/healthy-food.png')}
                resizeMode="contain"
                style={styles.food}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary
    },

    background: {
        width: 900,
        height: 900,
        position: 'absolute',
        top: "10%",
        borderTopStartRadius: "100%",
        borderTopEndRadius: "100%",
        backgroundColor: COLORS.dark
    },

    content: {
        justifyContent: 'center',
        alignItems: 'center',
        width: "80%",
        height: "30%",
        backgroundColor: "white",
        borderRadius: 20,
        marginTop: "50%",
        zIndex: 10,
        opacity: 0.9
    },

    title: {
        fontFamily: "Josefin-Sans",
        fontSize: 30,
        marginBottom: 20
    },

    input: {
        fontFamily: "Josefin-Sans",
        width: '80%',
        height: 40,
        borderColor: COLORS.dark,
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 10
    },

    button: {
        width: 100,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.secondary,
    },

    logo: {
        width: '50%',
        height: "100%",
        position: "absolute",
        alignSelf: "center",
        bottom: "20%"
    },

    food: {
        width: '100%',
        height: "100%",
        position: "absolute",
        bottom: "-40%"
    },

    buttonText: {
        fontFamily: "Josefin-Sans",
        color: "white",
        fontSize: 18
    }
})