import { useEffect } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import Octicons from "@expo/vector-icons/Octicons";
import Ionicons from "@expo/vector-icons/Ionicons";

import Colors from "./constants/Colors";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

import Login from "./screens/authentication/Login";
import SignUp from "./screens/authentication/SignUp";
import Home from "./screens/home/Home";
import Favourite from "./screens/Favourite";
import Cart from "./screens/Cart";
import Profile from "./screens/Profile";

export default function App() {
  const [loaded, error] = useFonts({
    "OpenSans-Regular": require("./assets/fonts/OpenSans-Regular.ttf"),
    "OpenSans-Bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "OpenSans-Light": require("./assets/fonts/OpenSans-Light.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  const TapNavigation = () => {
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
          name="Cart"
          component={Cart}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="heart-outline" size={25} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Favourite"
          component={Favourite}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="cart-outline" size={25} color={color} />
            ),
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

  function CustomSignUpHeader({ title }) {
    const navigation = useNavigation();
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{
              header: (props) => (
                <CustomSignUpHeader title="Sign up" {...props} />
              ),
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              header: (props) => <CustomHeader title="Log in" {...props} />,
            }}
          />
          <Stack.Screen name="TapNavigation" component={TapNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
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
    fontSize: 45,
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
