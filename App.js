import { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import Octicons from "@expo/vector-icons/Octicons";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import Colors from "./constants/Colors";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

import Login from "./screens/authentication/Login";
import SignUp from "./screens/authentication/SignUp";
import Home from "./screens/home/Home";
import Favourite from "./screens/Favourite";
import Cart from "./screens/payments/Cart";
import Profile from "./screens/Profile";

import PickBestFood from "./screens/onBoarding/PickBestFood";
import FastDelivery from "./screens/onBoarding/FastDelivery";
import LiveTracking from "./screens/onBoarding/LiveTracking";
import GetStarted from "./screens/onBoarding/GetStarted";
import FoodCategory from "./screens/onBoarding/FoodCategory";
import FoodDetails from "./screens/FoodDetails";
import BestDeals from "./screens/BestDeals";
import CheckOut from "./screens/payments/CheckOut";
import Payment from "./screens/payments/Payment";
import PickLocation from "./screens/PickLocation";
import OrderReview from "./screens/order/OrderReview";

import AppContextProvider from "./store/AppContextProvider";
import { AuthContext } from "./store/AuthContext";
import { CartContext } from "./store/CartContext";

function CustomSignUpHeader({ title }) {
  return (
    <ImageBackground
      source={require("./assets/images/Authentication/signupBackgroundImage.jpg")}
      style={styles.headerBackground}
      resizeMode="cover"
    >
      <View style={styles.imageOverlay} />
      <Text style={styles.SignupHeaderTitle}>{title}</Text>
    </ImageBackground>
  );
}

function CustomHeader({ title }) {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={require("./assets/images/Login/backgroundImage.jpg")}
      style={styles.headerBackground}
      resizeMode="cover"
    >
      <View style={styles.imageOverlay} />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>{title}</Text>
    </ImageBackground>
  );
}

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          header: (props) => <CustomSignUpHeader title="Sign up" {...props} />,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          header: (props) => <CustomHeader title="Log in" {...props} />,
        }}
      />
    </Stack.Navigator>
  );
};

const GetStartedStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="PickBestFood" component={PickBestFood} />
      <Stack.Screen name="FastDelivery" component={FastDelivery} />
      <Stack.Screen name="LiveTracking" component={LiveTracking} />
      <Stack.Screen name="GetStarted" component={GetStarted} />
      <Stack.Screen name="FoodCategory" component={FoodCategory} />
    </Stack.Navigator>
  );
};

const AuthenticatedStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: Colors.primary300 },
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FoodDetails"
        component={FoodDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="BestDeals" component={BestDeals} />
      <Stack.Screen
        name="CheckOut"
        component={CheckOut}
        options={{
          title: "Checkout",
          headerStyle: {
            backgroundColor: Colors.primary300,
          },
          headerTintColor: Colors.primary100,
          headerTitleStyle: {
            fontFamily: "OpenSans-Bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{
          title: "Payment",
          headerStyle: {
            backgroundColor: Colors.primary300,
          },
          headerTintColor: Colors.primary100,
          headerTitleStyle: {
            fontFamily: "OpenSans-Bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="PickLocation"
        component={PickLocation}
        options={{
          title: "Select Location",
          headerStyle: {
            backgroundColor: Colors.primary300,
          },
          headerTintColor: Colors.primary100,
          headerTitleStyle: {
            fontFamily: "OpenSans-Bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="OrderReview"
        component={OrderReview}
        options={{
          title: "Order Review",
          headerStyle: {
            backgroundColor: Colors.primary300,
          },
          headerTintColor: Colors.primary100,
          headerTitleStyle: {
            fontFamily: "OpenSans-Bold",
          },
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
};

const MainTabs = () => {
  const navigation = useNavigation();
  const cartCtx = useContext(CartContext);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.primary200,
        tabBarInactiveTintColor: Colors.primary100,
        tabBarStyle: styles.tabBar,
        tabBarIconStyle: styles.tabBarIcon,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Octicons name="home" size={25} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Favourite"
        component={Favourite}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="heart-outline" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="cart-outline" size={25} color={color} />
          ),
          tabBarBadge: cartCtx.totalQuantity,
          headerStyle: {
            backgroundColor: Colors.primary300,
          },
          headerTintColor: Colors.primary100,
          headerTitleStyle: {
            fontFamily: "OpenSans-Bold",
            fontSize: 25,
          },
          headerTitleAlign: "center",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated ? (
        <AuthStack />
      ) : !authCtx.isOnboardingComplete ? (
        <GetStartedStack />
      ) : (
        <AuthenticatedStack />
      )}
    </NavigationContainer>
  );
};

const Root = () => {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();

        const storedToken = await AsyncStorage.getItem("token");
        const onboardingToken = await AsyncStorage.getItem(
          "onboardingComplete"
        );

        if (storedToken) {
          authCtx.authenticate(storedToken);
        }

        if (onboardingToken) {
          authCtx.OnboardingComplete(onboardingToken);
        }

        setIsTryingLogin(false);
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (error) {
        console.warn(error);
      } finally {
        setIsTryingLogin(false);
        await SplashScreen.hideAsync();
      }
    };

    initializeApp();
  }, []);

  if (isTryingLogin) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.primary300,
        }}
      >
        {/* <ActivityIndicator size="large" color={Colors.primary200} /> */}
        <FontAwesome5 name="pizza-slice" size={35} color={Colors.primary200} />
      </View>
    );
  }

  return <Navigation />;
};

export default function App() {
  const [loaded, error] = useFonts({
    "OpenSans-Regular": require("./assets/fonts/OpenSans-Regular.ttf"),
    "OpenSans-Bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "OpenSans-Light": require("./assets/fonts/OpenSans-Light.ttf"),
  });

  useEffect(() => {
    async function hideSplashScreen() {
      if (loaded || error) {
        await SplashScreen.hideAsync();
      }
    }
    hideSplashScreen();
  }, [loaded, error]);

  return (
    <AppContextProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <Root />
      </SafeAreaView>
    </AppContextProvider>
  );
}

const styles = StyleSheet.create({
  headerBackground: {
    width: "100%",
    height: 250,
    alignItems: "center",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 15,
    top: 50,
  },
  SignupHeaderTitle: {
    color: "white",
    fontSize: 35,
    fontFamily: "OpenSans-Bold",
    top: 50,
  },
  headerTitle: {
    color: "white",
    fontSize: 30,
    fontFamily: "OpenSans-Bold",
    top: 35,
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 1)",
    opacity: 0.3,
    borderRadius: 30,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.primary300,
    paddingTop: 10,
  },
  tabBar: {
    backgroundColor: Colors.primary400,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: 60,
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  tabBarIcon: {
    margin: 8,
  },
  screenWrapper: {
    flex: 1,
    backgroundColor: Colors.primary300,
  },
});
