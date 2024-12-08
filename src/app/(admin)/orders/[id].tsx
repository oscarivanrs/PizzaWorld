import OrderItemListItem from "@/components/OrderItemListItem";
import OrderListItem from "@/components/OrderListItem";
import { Stack, useLocalSearchParams } from "expo-router";
import { View, StyleSheet, FlatList, Text, Pressable, ActivityIndicator } from "react-native"
import { OrderStatusList } from "@/types";
import { Colors } from "@/constants/Colors";
import React from "react";
import { useOrderDetails } from "@/app/api/orders";
import { useOrderItems } from "@/app/api/order-items";

export default function orderDetails() {
    const { id: idString } = useLocalSearchParams();
    const id = parseFloat( typeof idString === 'string' ? idString : idString?.[0] );

    const { data: order, isLoading, error } = useOrderDetails(id);
    const { data: orderItems, isLoading: isLoandingItems, error: errorItems} = useOrderItems(id); 
    
    const updateStatus = async (stato: string) => {
        console.log(`updateStatus(${stato})`)
      };

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
        {isLoandingItems ? (
          <ActivityIndicator />
        ) : (
        <FlatList
          data={orderItems}
          renderItem={({ item }) => <OrderItemListItem orderItem={item} />}
          contentContainerStyle={{ gap: 10 }}
          ListFooterComponent={() => (
            <>
              <Text>Status</Text>
              <View style={styles.ordersStatus}>
                {OrderStatusList.map((stato) => (
                  <Pressable
                    key={stato}
                    onPress={() => updateStatus(stato)}
                    style={[styles.orderStatus,
                        {
                            backgroundColor:
                            order.status === stato
                            ? Colors.light.tint
                            : 'transparent'
                        }
                    ]}
                  >
                    <Text
                      style={[
                        styles.orderStatusText,
                        {
                          color:
                            order.status === stato
                              ? "white"
                              : Colors.light.tint,
                        },
                      ]}
                    >
                      {stato}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </>
          )}
        />
        )}
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      padding: 10,
      flex: 1,
      gap: 10,
    },
    ordersStatus: {
        flexDirection: 'row', 
        gap: 5
    },
    orderStatus: {
        borderColor: Colors.light.tint,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginVertical: 10
    },
    orderStatusText: {
        fontSize: 10,
    }
})