import { Redirect, Tabs } from 'expo-router';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { TabBarIcon } from '@components/navigation/TabBarIcon';
import { Colors } from '@constants/Colors';
import { useColorScheme } from '@../../hooks/useColorScheme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useAuth } from '../providers/AuthProvider';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isAdmin = useAuth();

  if(!isAdmin) {
      return <Redirect href='/' />
    }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: { backgroundColor: Colors.dark.background}
      }}>
        <Tabs.Screen name="index" options={{href: null}} />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name={'cutlery'} color={color} size={24}/>
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'list' : 'list-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="goback"
        options={{
          title: 'Back',
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="back" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
