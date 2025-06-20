import { Stack, useSegments } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '@/hooks/useAuth';

import { useFonts } from 'expo-font'
import { ThemeProvider, useThemeContext } from '@/contexts/ThemeContext';
import { useEffect, useState } from 'react';
import {RefreshProvider} from "@/contexts/RefreshContext";

export default function RootLayout() {
  const loadUser  = useAuth()
  const [loadStartup, setLoadStartup] = useState(true)


  const [loaded] = useFonts({
    'Josefin-Sans': require('../assets/fonts/Josefin_Sans/static/JosefinSans-Regular.ttf'),
    'Josefin-Sans-Bold': require('../assets/fonts/Josefin_Sans/static/JosefinSans-Bold.ttf'),
    'Josefin-Sans-Italic': require('../assets/fonts/Josefin_Sans/static/JosefinSans-Italic.ttf')
  })

  useEffect(() => {
    const timer = setTimeout(() => setLoadStartup(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  if (loadUser && !loaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
      <RefreshProvider>
    <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }} >
          <Stack.Screen name='(auth)'/>
        </Stack>
    </ThemeProvider>
      </RefreshProvider>
  )
}
