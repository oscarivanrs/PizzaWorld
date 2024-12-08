import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import OrderListItem from '@components/OrderListItem'
import { useMyOrders } from '@/app/api/orders';

export default function OrdersScreen() {

    const {data: orders, isLoading, error} = useMyOrders();
    
    if(isLoading) {
        return <ActivityIndicator />
    }

    if(error) {
        return <View>
        <Text>Failed to fetch orders</Text>
        </View>
    }

    return (
        <View style={styles.container}>
            <FlatList 
            data={orders} 
            renderItem={({ item }) => <OrderListItem order={item} />}
            contentContainerStyle={{ gap: 10, padding: 5 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})