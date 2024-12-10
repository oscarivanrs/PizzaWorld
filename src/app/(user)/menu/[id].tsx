import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Text, View, Image, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { defaultPizzaImage } from '@/constants/Images';
import { Colors } from '@/constants/Colors';
import { useState } from 'react';
import Button from '@/components/Button';
import { useCart } from '@providers/CartProvider';
import { PizzaSize } from '@/types';
import { useProduct } from '@/app/api/products';
import RemoteImage from '@/components/RemoteImage';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

export default function productDetails() {
    const { id } = useLocalSearchParams();
    const {data: product, isLoading, error,} = useProduct(parseInt(typeof id === 'string' ? id : id?.[0]));

    const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');
    const { addItem } = useCart();
    const router = useRouter();
    
    if (isLoading) {
      return <ActivityIndicator />;
    }
    if (error) {
      return <Text>Failed to fetch product</Text>;
    }
  
    const addToCart = () => {
      if(!product){
        return;
      }
      addItem(product, selectedSize);
      router.push('/cart');
    };

    if(!product) {
        return (
            <Text>Product not found.</Text>
        );
    }

    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: `${product?.name}` }} />
        {/*<Image
          style={styles.productImage}
          source={{ uri: product?.image || defaultPizzaImage }}
          resizeMode="contain"
        />*/}
        <RemoteImage path={product.image} fallback={defaultPizzaImage} resizeMode='contain' style={styles.productImage}/>
        <Text>Select size</Text>
        <View style={styles.productSizes}>
          {sizes.map((size) => (
            <Pressable onPress={() => {
              setSelectedSize(size);
            }}
              key={size}
              style={[
                styles.productSize,
                {
                  backgroundColor:
                    selectedSize === size ? "gainsboro" : "transparent",
                },
              ]}
            >
              <Text
                style={[
                  styles.productSizeText,
                  {
                    color: selectedSize === size ? "black" : "gray",
                  },
                ]}
              >
                {size}
              </Text>
            </Pressable>
          ))}
        </View>
        <Text style={styles.productPrice}>€ {product?.price}</Text>
        <Button onPress={addToCart} text="Add to cart"></Button>
        <Text>Ingredients: </Text>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    flex: 1,
    margin: 2,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginTop: 'auto'
  },
  productImage: {
    width: "100%",
    aspectRatio: 1,
  },
  productSizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10
  },
  productSize: {
    backgroundColor: 'gainsboro',
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  productSizeText: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});