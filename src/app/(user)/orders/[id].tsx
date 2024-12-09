import { useOrderDetails } from "@/app/api/orders";
import { useUpdateOrderSubscription } from "@/app/api/orders/subscriptions";
import OrderItemListItem from "@/components/OrderItemListItem";
import OrderListItem from "@/components/OrderListItem";
import { Stack, useLocalSearchParams } from "expo-router";
import { View, StyleSheet, FlatList, Text, ActivityIndicator } from "react-native"

export default function orderDetails() {
    const { id: idString } = useLocalSearchParams();
    const id = parseFloat( typeof idString === 'string' ? idString : idString?.[0] );

    const { data: order, isLoading, error } = useOrderDetails(id);
    useUpdateOrderSubscription(id);

    if (isLoading) {
        return <ActivityIndicator />;
    }
    if (error) {
        return <Text>Failed to fetch</Text>;
    }

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