import { FlatList, StyleSheet, View } from 'react-native';
import products from '@assets/data/products';
import ProductListItem from '@components/ProductListItem';

const numCols = 2;

export default function MenuScreen() {
  return (
    <View>
      {/*<ProductListItem product={products[0]}/>
      <ProductListItem product={products[1]}/>*/}
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={numCols}
        contentContainerStyle={{ gap: 10, padding: 5 }}
        columnWrapperStyle={{ gap: 10, padding: 10}}
      />
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
  }
});
