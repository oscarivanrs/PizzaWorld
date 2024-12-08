import { Tabs, withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import OrdersScreen from ".";
import ArchivedOrdersScreen from "./archive";

/*export const Tab = withLayoutContext(
    createMaterialTopTabNavigator().Navigator
  );*/

  const Tab = createMaterialTopTabNavigator();

export default function OrderListNavigator() {
    return (
      <SafeAreaView edges={['top']} style={{flex: 1, backgroundColor: Colors.light.background}}>
        <Tab.Navigator screenOptions={{
          tabBarLabelStyle: { fontSize: 12, color: Colors.dark.text, textTransform: 'uppercase' },
          tabBarStyle: { backgroundColor: Colors.dark.tint },
        }}>
          <Tab.Screen name="index" options={{ title: 'Active' }} component={OrdersScreen}/>
          <Tab.Screen name="archive" options={{ title: 'Archived' }} component={ArchivedOrdersScreen}/>
        </Tab.Navigator>
      </SafeAreaView>
    );
}