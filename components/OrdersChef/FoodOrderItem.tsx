import { createGlobalStyles } from '@/assets/styles/Global.styles';
import { COLORS } from '@/constants/colors';
import { useThemeContext } from '@/contexts/ThemeContext';
import React, {useState, useEffect} from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';

export default function FoodOrderItem({
  id,
  name,
  quantity,
  completed,
  onComplete,
}) {
  const [isCompleted, setIsCompleted] = useState(completed);

  const { isDark } = useThemeContext()
  const globalStyles = createGlobalStyles(isDark)

  useEffect(() => {
    setIsCompleted(completed);
  }, [completed]); 

  const handlePress = async () => {
    onComplete(id);           
    Alert.alert(
    "Confirm",
    "Are you sure you want to complete this food order?",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          setIsCompleted(true);
        },
      },
    ],
    { cancelable: true }
    );
  }
    return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} disabled={isCompleted}>
        <Text style={[isCompleted ? styles.strikeThrough : styles.orderItem, { color: isCompleted ? COLORS.completeFoodOrder : isDark ? COLORS.light : COLORS.dark}]}>
          {name} x{quantity}
        </Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  orderItem: {
    fontSize: 16,
    fontFamily: 'Josefin-Sans',
    color: '#000',
  },
  strikeThrough: {
    textDecorationLine: 'line-through',
    color: COLORS.completeFoodOrder,
    fontFamily: 'Josefin-Sans',
    fontSize: 16,
    marginBottom: 5,
    opacity: 0.8,
  },
});
