import { Image, ImageBackground, Pressable, StyleSheet, Text } from 'react-native';

import { Colors } from '@constants/Colors';
import { Link, useSegments } from 'expo-router';
import { defaultPizzaImage } from '@/constants/Images';
import { Product } from '@/types';
import RemoteImage from './RemoteImage';

type ProductListItemProps = {
    product: Product;
}

const ProductListItem = ({product}: ProductListItemProps) => {
  const segments = useSegments();
  const path: any = `/${segments[0]}/menu/${product.id.toString()}`;
  return (
    <Link href={path} asChild>
        <Pressable style={styles.container}>
        <ImageBackground source={require('@assets/images/partial-react-logo.png')} resizeMode="cover" style={styles.imageBG}>
        {/*<Image style={styles.productImage} source={{uri: product.image || defaultPizzaImage }} resizeMode='contain'/>*/}
        <RemoteImage path={product.image} fallback={defaultPizzaImage} resizeMode='contain' style={styles.productImage}/>
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
