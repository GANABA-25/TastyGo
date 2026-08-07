import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import HomeScreen from "./home";
import OrdersScreen from "./orders";
import ProfileScreen from "./profile";
import SavedScreen from "./saved";

import { CircleDollarSign, Heart, House, UserRound } from "lucide-react-native";

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#fd6c39",
        tabBarInactiveTintColor: "#9ca3af",
        tabBarStyle: {
          height: 100,
          paddingBottom: 20,
          paddingTop: 20,
        },
        tabBarLabelStyle: {
          fontFamily: "Inter-Bold",
          fontSize: 12,
        },
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case "Home":
              return <House color={color} size={size} />;

            case "Saved":
              return <Heart color={color} size={size} />;

            case "Orders":
              return <CircleDollarSign color={color} size={size} />;

            case "Profile":
              return <UserRound color={color} size={size} />;

            default:
              return null;
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Saved" component={SavedScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
