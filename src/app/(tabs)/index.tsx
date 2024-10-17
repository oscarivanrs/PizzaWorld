import { Image, StyleSheet, Text, View } from 'react-native';

import { HelloWave } from '@/src/components/HelloWave';
import ParallaxScrollView from '@/src/components/ParallaxScrollView';
import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';


import { Colors } from '@/src/constants/Colors';
import products from '../../../assets/data/products';

const product = products[0];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image source={{uri: product.image}} style={styles.productImage} />
      <Text style={styles.productTitle}>{product.name}</Text>
      <Text>{product.price} €</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  container: {
    /*flex: 1,
    alignItems: 'center',
    justifyContent: 'center'*/
    backgroundColor: 'lightgrey',
    padding: 10,
    borderRadius: 20
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  productTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10
  },
  productPrice: {
    color: Colors.light.tint
  },
  productImage: {
    /*width: 100,
    height: 100*/
    width: '100%',
    aspectRatio: 1
  }
});
