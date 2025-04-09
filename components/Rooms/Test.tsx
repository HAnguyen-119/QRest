import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BLOCK_SIZE = 40; // pixel

const Block = ({ item }) => {
  const { type, size, position } = item;

  const backgroundColors = {
    chair: '#4aa3df',
    table: '#357ebd',
    walkway: '#bdbdbd',
    hallway: '#7bc043',
    entrance: '#f4c20d',
    reception: '#f46c45',
  };

  return (
    <View
      style={{
        position: 'absolute',
        top: position[0] * BLOCK_SIZE,
        left: position[1] * BLOCK_SIZE,
        width: size.x * BLOCK_SIZE,
        height: size.y * BLOCK_SIZE,
        backgroundColor: backgroundColors[type] || 'gray',
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ color: 'white', fontSize: 12 }}>{type}</Text>
    </View>
  );
};

const RestaurantLayout = ({ layout }) => {
  return (
    <View style={styles.container}>
      {layout.map((item, index) => (
        <Block key={index} item={item} />
      ))}
    </View>
  );
};

export default RestaurantLayout;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: '#f1f1f1',
  },
});
