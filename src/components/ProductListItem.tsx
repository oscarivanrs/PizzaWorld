import { Image, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/src/constants/Colors';
import { Product } from '@/src/types';

const DefaultImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

type ProductListItemProps = {
    product: Product;
}

const ProductListItem = ({product}: ProductListItemProps) => {
  return (
    <View style={styles.container}>
      <Image style={styles.productImage} source={{uri: product.image || DefaultImage }}/>
      <Text style={styles.productTitle}>{product.name}</Text>
      <Text style={styles.productPrice}>{product.price} €</Text>
    </View>
  );
}

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgrey',
    padding: 10,
    borderRadius: 20
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
    width: '100%',
    aspectRatio: 1,
  }
});
