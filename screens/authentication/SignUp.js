import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import Colors from "../../constants/Colors";
import Input from "../../components/Input";
import Button from "../../components/Button";

const SignUp = ({ navigation }) => {
  const [viewPassword, setViewPassword] = useState(false);
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setSignupData((prevState) => {
      return { ...prevState, [inputIdentifier]: enteredValue };
    });
  };

  const viewPasswordHandler = () => {
    setViewPassword((prevState) => !prevState);
  };
  const SubmitHandler = () => {
    console.log(signupData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Input
          label="Full Name"
          TextInputConfig={{
            autoCorrect: false,
            placeholder: "Enter Email FullName",
            value: signupData.fullName,
            onChangeText: inputChangeHandler.bind(this, "fullName"),
          }}
        />
        <Input
          label="Email"
          TextInputConfig={{
            autoCorrect: false,
            placeholder: "Enter Email Address",
            value: signupData.email,
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
            value: signupData.password,
            onChangeText: inputChangeHandler.bind(this, "password"),
          }}
        />
        <Input
          label="Confirm Password"
          icon="lock-closed-outline"
          type="password"
          showPassword="eye-outline"
          hidePassword="eye-off-outline"
          onPress={viewPasswordHandler}
          viewPassword={viewPassword}
          TextInputConfig={{
            autoCorrect: false,
            placeholder: "Confirm Password",
            secureTextEntry: !viewPassword,
            value: signupData.confirmPassword,
            onChangeText: inputChangeHandler.bind(this, "confirmPassword"),
          }}
        />
        <View style={styles.login}>
          <Text style={styles.loginText}>Already have an account </Text>
          <Text
            style={styles.loginText}
            onPress={() => navigation.navigate("Login")}
          >
            Log In
          </Text>
        </View>
        <Button title="Continue" onPress={SubmitHandler} />

        <View style={styles.signinOptions}>
          <Ionicons name="logo-google" size={25} color="white" />
          <FontAwesome5 name="facebook-f" size={25} color="white" />
          <Ionicons name="logo-apple" size={25} color="white" />
        </View>

        <Text style={styles.termsAndConditions}>
          By signing in, you agree to all terms and conditions governing the use
          of this platform.
        </Text>
      </View>
    </View>
  );
};

export default SignUp;

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
    paddingTop: 50,
    paddingHorizontal: 15,
  },
  login: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  loginText: {
    color: Colors.primary100,
    fontFamily: "OpenSans-Bold",
  },
  signinOptions: {
    paddingTop: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 45,
  },
  signinWith: {
    color: Colors.primary100,
    textAlign: "center",
    fontFamily: "OpenSans-Light",
  },
  termsAndConditions: {
    textAlign: "center",
    fontFamily: "OpenSans-Regular",
    fontSize: 10,
    color: Colors.primary100,
    paddingTop: 10,
    width: "90%",
    margin: "auto",
  },
});
