import React from 'react';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: 'gray',
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tabIconSelected,
        tabBarLabelStyle: {
          fontFamily: 'Outfit',
          fontSize: 12,
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={({
          title: 'Leaderboard',
          headerTitleStyle: {
            fontSize: 23,
            fontFamily: 'Outfit',
          },
          tabBarIcon: ({ color }) => <MaterialIcons name="leaderboard" size={24} color={color} />,

        })}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Profile Lookup',
          headerTitleStyle: {
            fontSize: 23,
            fontFamily: 'Outfit',
          },
          tabBarIcon: ({ color }) => <FontAwesome name="search" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}