import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./home";

import cartScreen from "./cart";
import OrdersScreen from "./orders";
import ProfileScreen from "./profile";
import SavedScreen from "./saved";

import { useCart } from "@/src/store/cartContext";
import {
  CircleDollarSign,
  Heart,
  House,
  ShoppingCart,
  UserRound,
} from "lucide-react-native";

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const { cart } = useCart();

  const cartItemCount = cart.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

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

            case "Cart":
              return <ShoppingCart color={color} size={size} />;

            default:
              return null;
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="Cart"
        component={cartScreen}
        options={{
          headerShown: true,
          headerTitle: "Your Cart",
          headerTitleStyle: {
            fontFamily: "Inter-Bold",
            fontSize: 22,
          },
          headerShadowVisible: false,

          tabBarBadge: cartItemCount > 0 ? cartItemCount : undefined,
          tabBarBadgeStyle: {
            backgroundColor: "#fd6c39",
            color: "#fff",
            fontFamily: "Inter-Bold",
          },
        }}
      />
      <Tab.Screen name="Saved" component={SavedScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />

      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
