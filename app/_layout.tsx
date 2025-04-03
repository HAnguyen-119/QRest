import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RootLayout() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkLogin = async () => {
      const user = await AsyncStorage.getItem('user')
      if (!user) {
        router.replace('/(auth)/login')
      }
      setLoading(false)
    };

    checkLogin()
  }, [])

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }}/>
}
