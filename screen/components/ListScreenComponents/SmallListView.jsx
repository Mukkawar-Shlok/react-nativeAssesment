import React, { useState } from 'react';
import { 
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';

//default image source
import defaultImageSource from "../../../public/static/images/defaultProduct.jpg"

export default function SmallListView({ data }) {
  //image source state for changing image source in case of error
  const [imageSource, setImageSource] = useState({ uri: data.imageUrl });

  //handeling error while loading image
  const handleImageError = () => {
    //changing source of image
    setImageSource(defaultImageSource);
  };
  

  return (
    <View style={styles.container}>

        <Image
          source={imageSource}
          style={styles.image}
          onError={handleImageError}
          
        />

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.description}>{data.description}</Text>
        <Text style={styles.price}>${data.price}</Text>
      </View>
    </View>
  );
}

//styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  placeholderContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  placeholderText: {
    color: '#888',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    color: '#000',
  },
});
