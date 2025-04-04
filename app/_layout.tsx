import { Stack } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '@/hooks/useAuth';

import {useFonts} from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {useEffect} from "react";
import { useRootNavigationState } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState?.key) return null;
  const loading = useAuth()

  const [loaded, error] = useFonts({
    'Josefin-Sans': require('../assets/fonts/JosefinSans-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }}/>
}
