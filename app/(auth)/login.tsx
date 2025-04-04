import { validateLogin } from "@/utils/ValidateLogin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, {useState} from "react";
import {View, Text, TextInput, StyleSheet, Alert, TouchableOpacity} from "react-native";

import { role } from "@/constants/types";

export default function Login() {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const router = useRouter()
    const handleLogin = async () => {
        const user = validateLogin({username, password})
        if (user) {
            const role = user.role as role
            await AsyncStorage.setItem('user', JSON.stringify(user))
            Alert.alert('Login Successfull', `Welcome, ${role}`)
            router.push(`/${role}/dashboard`)
        } else {
            Alert.alert('Login Failed', 'Invalid username or password')
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
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
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },

    title: {
        fontFamily: "Josefin-Sans",
        fontSize: 30,
        marginBottom: 20
    },

    input: {
        fontFamily: "Josefin-Sans",
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10
    },

    button: {
        width: 70,
        height: 30,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        fontFamily: "Josefin-Sans",
    }
})