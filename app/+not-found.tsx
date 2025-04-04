import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View, StyleSheet, Button } from 'react-native';

import { getUserPage } from '../utils/GetDashboardRoute'

export default function NotFound() {
    const router = useRouter()
    const handleReturn = async (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        const user = await AsyncStorage.getItem('user')
        //@ts-ignore
        // router.replace(getUserPage(user))
        router.replace('(auth)/login')
    }
    return (
        <>
            <Stack.Screen options={{ title: "Oops! This screen doesn't exist." }} />
            <View style={styles.container}>
                <Button title='Log out' onPress={handleReturn}/>
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});