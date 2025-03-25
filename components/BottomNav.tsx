import { View, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

export default function BottomNav({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
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
          <View style={styles.bottomNav}>
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              onLongPress={onLongPress}
              style={ styles.buttonCover }
            >
              {iconComponent}
              { isFocused && 
                <Text style={{ color: isFocused ? colors.primary : colors.text, borderRadius: 5 }}>
                  {label}
                </Text>
              }
            </TouchableOpacity>
          </View>
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
    },
    bottomNav: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        color: 'red'
    },
    buttonFocus: {

    },
    buttonCover: {
      flexDirection: 'row',
    },
    barText: {
        borderRadius: 5
    }
})