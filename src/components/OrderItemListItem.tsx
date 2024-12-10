import { Colors } from "@/constants/Colors";
import { defaultPizzaImage } from "@/constants/Images";
import { OrderItem, Product } from "@/types";
import { View, StyleSheet, Image, Text } from "react-native";
import RemoteImage from "./RemoteImage";

type OrderItemListItemProps = {
    orderItem: { products: Product | null } & OrderItem;
}

export default function OrderItemListItem({orderItem}: OrderItemListItemProps) {

    const total = (orderItem.quantity * orderItem.products?.price!);

    return (
        <View style={styles.container}>
            {/*<Image style={styles.productImage} source={{uri: orderItem.products?.image || defaultPizzaImage }} resizeMode='contain'/>*/}
            <RemoteImage path={orderItem.products?.image} fallback={defaultPizzaImage} resizeMode='contain'/>
            <View style={{flex: 1}}>
                <Text style={styles.productName}>{orderItem.products?.name}</Text>
                <View style={styles.orderPrice}>
                    <Text style={styles.priceText}>${total.toFixed(2)}</Text>
                    <Text>Size: {orderItem.size}</Text>
                </View>
            </View>
            <Text style={styles.quantityLabel}>{orderItem.quantity}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 20,
      flex: 1,
      margin: 2,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    productImage: {
        width: 75,
        aspectRatio: 1,
        alignSelf: 'center',
        marginRight: 10,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10
    },
    orderPrice: {
        flexDirection: 'row',
        gap: 5
    },
    priceText: {
        color: Colors.light.tint
    },
    quantityLabel: {
        fontSize: 22,
        fontWeight: 'bold'
    }
})