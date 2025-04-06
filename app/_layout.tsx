import { Stack, useSegments } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '@/hooks/useAuth';

import { useFonts } from 'expo-font'
import { COLORS } from '@/constants/colors';
import { ThemeProvider, useThemeContext } from '@/contexts/ThemeContext';

export default function RootLayout() {
  console.log(useSegments()[useSegments().length - 1])
  const loading = useAuth()

  const [loaded] = useFonts({
    'Josefin-Sans': require('../assets/fonts/Josefin_Sans/static/JosefinSans-Regular.ttf')
  })

  if (loading && !loaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  )
}
