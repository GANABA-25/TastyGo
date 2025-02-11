import { useState } from "react";
import { StyleSheet } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import { View, Text } from "react-native";
import Input from "../../components/Input";
import Colors from "../../constants/Colors";

import Button from "../../components/Button";

const Login = () => {
  const [viewPassword, setViewPassword] = useState(false);
  const [LoginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setLoginData((prevState) => {
      return { ...prevState, [inputIdentifier]: enteredValue };
    });
  };

  const viewPasswordHandler = () => {
    setViewPassword((prevState) => !prevState);
  };

  const SubmitHandler = () => {
    console.log(LoginData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Input
          label="Email Address"
          icon="mail-outline"
          type="text"
          TextInputConfig={{
            autoCorrect: false,
            placeholder: "Enter Email Address",
            value: LoginData.email,
            onChangeText: inputChangeHandler.bind(this, "email"),
          }}
        />

        <Input
          label="Password"
          icon="lock-closed-outline"
          type="password"
          showPassword="eye-outline"
          hidePassword="eye-off-outline"
          onPress={viewPasswordHandler}
          viewPassword={viewPassword}
          TextInputConfig={{
            autoCorrect: false,
            placeholder: "Enter Password",
            secureTextEntry: !viewPassword,
            value: LoginData.password,
            onChangeText: inputChangeHandler.bind(this, "password"),
          }}
        />
        <Text style={styles.forgetPassword}>Forgot Password</Text>

        <View style={styles.button}>
          <Button title="Continue" onPress={SubmitHandler} />
        </View>

        <View style={styles.signinOptions}>
          <Text style={styles.signinWith}>Or Login With</Text>
          <View style={styles.icons}>
            <Ionicons name="logo-google" size={35} color="white" />
            <FontAwesome5 name="facebook-f" size={35} color="white" />
            <Ionicons name="logo-apple" size={35} color="white" />
          </View>
        </View>

        <Text style={styles.termsAndConditions}>
          By signing in, you agree to all terms and conditions governing the use
          of this platform.
        </Text>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary300,
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 160,
    zIndex: 24,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  innerContainer: {
    gap: 24,
    paddingTop: 70,
    paddingHorizontal: 15,
  },
  forgetPassword: {
    color: Colors.primary100,
    fontFamily: "OpenSans-Bold",
    alignSelf: "flex-end",
  },
  button: {
    paddingVertical: 15,
  },
  signinOptions: {
    gap: 30,
  },
  signinWith: {
    color: Colors.primary100,
    textAlign: "center",
    fontFamily: "OpenSans-Light",
  },
  icons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 45,
  },
  termsAndConditions: {
    textAlign: "center",
    fontFamily: "OpenSans-Regular",
    fontSize: 10,
    color: Colors.primary100,
    paddingTop: 80,
    width: "90%",
    margin: "auto",
  },
});
