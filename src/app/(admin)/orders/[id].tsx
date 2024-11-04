import OrderItemListItem from "@/components/OrderItemListItem";
import OrderListItem from "@/components/OrderListItem";
import orders from '@assets/data/orders';
import { Stack, useLocalSearchParams } from "expo-router";
import { View, StyleSheet, FlatList, Text } from "react-native"

export default function orderDetails() {
    const { id } = useLocalSearchParams();
    const order = orders.find((o) => o.id.toString() === id);

    if(!order) {
        return (
            <View style={styles.container}>
                <Stack.Screen options={{ title: `Order #${id}` }} />
                <Text>Order #{id} not found!</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: `Order #${order.id}` }} />
            <OrderListItem order={order} />
            <FlatList data={order.order_items} 
            renderItem={({ item }) => <OrderItemListItem orderItem={item} />}
            contentContainerStyle={{ gap: 10 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      padding: 10,
      flex: 1,
      gap: 10,
    }
})