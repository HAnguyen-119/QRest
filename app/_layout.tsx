import { Stack } from "expo-router";
import {View, Text} from "react-native";

export default function RootLayout() {
  return (
      <View style={{ flex: 1 }}>
        <View style={{height: 50}}>
          <Text>QRest</Text>
        </View>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
  );
}
