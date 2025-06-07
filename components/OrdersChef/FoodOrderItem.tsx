import React, {useState, useEffect} from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

export default function FoodOrderItem({
  id,
  name,
  quantity,
  completed,
  onComplete,
}) {
  const [isCompleted, setIsCompleted] = useState(completed);

  useEffect(() => {
    setIsCompleted(completed);
  }, [completed]); 

  const handlePress = async () => {
    onComplete(id);           
    setIsCompleted(true);          
  };
    return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <Text style={isCompleted ? styles.strikeThrough : styles.orderItem}>
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
    color: '#999',
    fontFamily: 'Josefin-Sans',
    fontSize: 16,
    marginBottom: 5,
  },
});
