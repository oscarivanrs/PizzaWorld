import { Tabs, withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ArchivedOrdersScreen from "./archive";
import OrdersScreen from "./index";

const MyTabs = createMaterialTopTabNavigator({
    screens: {
      Home: OrdersScreen,
      Profile: ArchivedOrdersScreen,
    },
  });

export const TopTabs = withLayoutContext(
    createMaterialTopTabNavigator().Navigator
  );

export default function OrderListNavigator() {
    return <TopTabs />;
}