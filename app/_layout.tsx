import { Stack } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '@/hooks/useAuth';

import { useFonts } from 'expo-font'

export default function RootLayout() {
  const loading = useAuth()

  const [loaded] = useFonts({
    'JosefinSans-Regular': require('../assets/fonts/Josefin_Sans/static/JosefinSans-Regular.ttf')
  })

  console.log(loaded)
  //test: checkout /staff/dashboard
  if (loading && !loaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }}/>
}
