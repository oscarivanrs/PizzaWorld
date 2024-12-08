import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import orders from '@assets/data/orders';
import OrderListItem from '@components/OrderListItem'
import { useAllOrdersList } from '@/app/api/orders';

export default function ArchivedOrdersScreen() {

    const {data: orders, isLoading, error} = useAllOrdersList({archived: true});
    
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