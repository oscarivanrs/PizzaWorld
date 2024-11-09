import { FlatList, StyleSheet, Text, View } from 'react-native';
import orders from '@assets/data/orders';
import OrderListItem from '@components/OrderListItem'

export default function OrdersScreen() {
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