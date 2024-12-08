import { useProduct } from "@/app/api/products";
import { Colors } from "@/constants/Colors";
import { defaultPizzaImage } from "@/constants/Images";
import { OrderItem } from "@/types";
import { View, StyleSheet, Image, Text, ActivityIndicator } from "react-native";

type OrderItemListItemProps = {
    orderItem: OrderItem;
}

export default function OrderItemListItem({orderItem}: OrderItemListItemProps) {

    const {data: product, isLoading, error,} = useProduct(orderItem.product_id);
    const total = (orderItem.quantity * product?.price!);

    if (isLoading) {
        return <ActivityIndicator />;
    }
    
    if (error) {
        return <Text>Failed to fetch product id { orderItem.product_id }</Text>;
    }

    return (
        <View style={styles.container}>
            <Image style={styles.productImage} source={{uri: product?.image || defaultPizzaImage }} resizeMode='contain'/>
            <View style={{flex: 1}}>
                <Text style={styles.productName}>{product?.name}</Text>
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