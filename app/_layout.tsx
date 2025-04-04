import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ROUTES } from '@/constrants/routes';
import { useAuth } from '@/hooks/useAuth';

export default function RootLayout() {
  const loading = useAuth()

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }}/>
}
