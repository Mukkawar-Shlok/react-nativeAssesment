import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function GridListView({ data }) {
  return (
    <View style={styles.gridItem}>
      <Image source={{ uri: data.imageUrl }} style={styles.gridImage} />
      <View style={styles.gridInfo}>
        <Text style={styles.gridName}>{data.name}</Text>
        <Text style={styles.gridDescription}>{data.description}</Text>
        <Text style={styles.gridPrice}>${data.price}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
    padding: 10,
  },
  gridImage: {
    width: '100%', 
    height: 100,
    borderRadius: 5,
  },
  gridInfo: {
    marginTop: 10,
    alignItems: 'center', 
  },
  gridName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  gridDescription: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  gridPrice: {
    fontSize: 16,
    color: '#000',
  },
});
