import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Order } from '@/types';
import { Link, useSegments } from 'expo-router';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';

type OrderListItemProps = {
    order: Order;
}

const OrderListItem = ({order}: OrderListItemProps) => {
    const segments = useSegments();
    const path: any = `/${segments[0]}/orders/${order.id.toString()}`;
    dayjs.extend(relativeTime);

    return (
        <Link href={path} asChild>
            <Pressable style={styles.container}>
            <View>
                <Text style={styles.orderTitle}>Order #{order.id}</Text>
                <Text style={styles.orderCreated}>{dayjs(order.created_at).fromNow()}</Text>
            </View>
            <Text style={styles.orderStatus}>{order.status}</Text>
            </Pressable>
        </Link>
    );
  }

export default OrderListItem;

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 20,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    orderTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginVertical: 5
    },
    orderCreated: {
        fontSize: 15,
        marginVertical: 10,
        color: 'gray'
    },
    orderStatus: {
        fontWeight: 'bold'
    }
  });