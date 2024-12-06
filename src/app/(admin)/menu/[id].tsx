import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { Text, View, Image, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { defaultPizzaImage } from '@/constants/Images';
import { Colors } from '@/constants/Colors';
import { PizzaSize } from '@/types';
import { FontAwesome } from "@expo/vector-icons";
import { useProduct } from '@/app/api/products';


const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

export default function productDetails() {
    const { id } = useLocalSearchParams();
    const {data: product, isLoading, error,} = useProduct(parseInt(typeof id === 'string' ? id : id[0]));
       
    if (isLoading) {
      return <ActivityIndicator />;
    }
    if (error || !product) {
      return <Text>Failed to fetch product</Text>;
    }

    const editPath: any = `/(admin)/menu/create?id=${id}`;

    if(!product) {
        return (
            <Text>Product not found.</Text>
        );
    }

    return (
      <View style={styles.container}>
        <Stack.Screen
          options={{
            title: "Product Details",
            headerRight: () => (
              <Link href={editPath} asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="pencil"
                      size={25}
                      color={Colors.light.text}
                      style={{
                        marginRight: 15,
                        opacity: pressed ? 0.5 : 1,
                      }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
          }}
        />
        <Stack.Screen options={{ title: `${product?.name}` }} />
        <Image
          style={styles.productImage}
          source={{ uri: product.image || defaultPizzaImage }}
          resizeMode="contain"
        />
        <Text style={styles.productPrice}>€ {product.price}</Text>
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
    color: Colors.light.tint
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