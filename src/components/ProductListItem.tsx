import { Image, ImageBackground, Pressable, StyleSheet, Text } from 'react-native';

import { Colors } from '@constants/Colors';
import { Product } from '@/types';
import { Link } from 'expo-router';

export const DefaultImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

type ProductListItemProps = {
    product: Product;
}

const ProductListItem = ({product}: ProductListItemProps) => {
  return (
    <Link href={`/menu/${product.id}`} asChild>
        <Pressable style={styles.container}>
        <ImageBackground source={require('@assets/images/partial-react-logo.png')} resizeMode="cover" style={styles.imageBG}>
        <Image style={styles.productImage} source={{uri: product.image || DefaultImage }} resizeMode='contain'/>
        <Text style={styles.productTitle}>{product.name}</Text>
        <Text style={styles.productPrice}>{product.price} €</Text>
        </ImageBackground>
        {/*<Link href={'/productDetails'}>Go to details</Link>*/}
        </Pressable>
    </Link>
  );
}

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    flex: 1,
    margin: 2,
    maxWidth: '50%'
  },
  imageBG: {
    justifyContent: 'center',
    width: '100%',
  },
  productTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10
  },
  productPrice: {
    color: Colors.dark.tint
  },
  productImage: {
    width: '100%',
    aspectRatio: 1,
  }
});
