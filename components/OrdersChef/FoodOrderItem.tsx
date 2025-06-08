import { createGlobalStyles } from '@/assets/styles/Global.styles';
import { COLORS } from '@/constants/colors';
import { useThemeContext } from '@/contexts/ThemeContext';
import React, {useState, useEffect} from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import ModalConfirm from '../Modal/ModalConfirmation';

export default function FoodOrderItem({
  id,
  name,
  quantity,
  completed,
  onComplete,
}) {
  const [isCompleted, setIsCompleted] = useState(completed);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const { isDark } = useThemeContext()
  const globalStyles = createGlobalStyles(isDark)

  useEffect(() => {
    setIsCompleted(completed);
  }, [completed]); 

  const handlePress = () => {
    setShowConfirmModal(true);
  };

  const handleConfirm = () => {
    onComplete(id);
    setIsCompleted(true);
    setShowConfirmModal(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} disabled={isCompleted}>
        <Text style={[isCompleted ? styles.strikeThrough : styles.orderItem, { color: isCompleted ? COLORS.completeFoodOrder : isDark ? COLORS.light : COLORS.dark}]}>
          {name} x{quantity}
        </Text>
      </TouchableOpacity>
      <ModalConfirm
        visible={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirm}
        title="Confirm"
        message="Are you sure you want to complete this food order?"
      />
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
