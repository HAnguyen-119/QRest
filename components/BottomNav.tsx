import { View, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'
//@ts-ignore
export default function BottomNav({ state, descriptors, navigation }) {
  const { colors } = useTheme();
  const width = useSharedValue(20)
  //@ts-ignore
  const stretch = (focus) => {
    let value = !focus ? 20 : 70
    width.value = withTiming(value, { duration: 1000 })
  }

  const animatedStyle = useAnimatedStyle(() => ({
    width: width.value
  }))

  return (
    <View style={styles.container}>
      {//@ts-ignore
      state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          stretch(isFocused)
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const iconComponent = options.tabBarIcon ? options.tabBarIcon({ color: isFocused ? colors.primary : colors.text, size: 20}) : null

        return (
          <Animated.View 
          key={route.key}
          style={[styles.bottomNav, isFocused ? styles.bottomFocus : styles.bottom]}>
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              onLongPress={onLongPress}
              style={ [!isFocused ? styles.buttonCover : styles.buttonFocus, animatedStyle] }
            >
              {iconComponent}
              { isFocused && 
                <Text style={{ color: isFocused ? colors.primary : colors.text, borderRadius: 5 }}>
                  {label}
                </Text>
              }
            </TouchableOpacity>
          </Animated.View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 25,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 15,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 30,
        width: '90%'
    },
    bottomNav: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        color: 'red'
    },
    bottomFocus:{
      width: '33%'
    },
    bottom: {
      width: '17%'
    },
    buttonFocus: {
      flexDirection: 'row',
      backgroundColor: 'red',
      paddingLeft: 15,
      paddingRight: 15,
      paddingTop: 10,
      paddingBottom: 10,
      borderRadius: 30,
      

    },
    buttonCover: {
      flexDirection: 'row',
    },
    barText: {
        borderRadius: 5
    }
})