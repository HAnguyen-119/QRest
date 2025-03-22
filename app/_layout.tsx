import { Stack } from "expo-router";
import {View, Text, StyleSheet, Image} from "react-native";

const logoImage = require('../assets/images/logo.png')

export default function RootLayout() {
  return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={logoImage}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logoContainer: {
    height: 100,
    justifyContent: 'center'
  },
  logo: {
    width: 100
  }
})