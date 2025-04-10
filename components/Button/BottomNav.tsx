import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import ButtonBottom from './ButtonBottom';
import { styles } from '@/assets/styles/button/BottomNav.styles';
import { COLORS } from '@/constants/colors';
import { useScrollAnimated } from '@/contexts/ScrollContext';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

export default function BottomNav({ state, descriptors, navigation }: BottomTabBarProps) {
  const numberOfIcons = state.routes.length
  const marginHorizontal = Math.max(20, 60 - 10 * (numberOfIcons - 3))
  const { translateY } = useScrollAnimated()

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }]
  }))
  
  return (
    <Animated.View style={[styles.container, {marginHorizontal: marginHorizontal}, animatedStyle]}>
      {
      state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title ? options.title: route.name;

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

        const iconComponent: JSX.Element = options.tabBarIcon ? options.tabBarIcon({
          color: COLORS.dark, size: 24,
          focused: false
        }) as JSX.Element : <View />;
        
        return (
            <ButtonBottom key={route.key} onPress={onPress} onLongPress={onLongPress} isFocused={isFocused} label={label} icon={iconComponent}/>
        );
      })}
    </Animated.View>
  );
}
