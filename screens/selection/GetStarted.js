import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useContext, useState } from "react";
import Colors from "../../constants/Colors";
import { AuthContext } from "../../store/auth-context";

const GetStarted = () => {
  const authCtx = useContext(AuthContext);

  const onboardingHandler = () => {
    const OnboardingToken = "12345678910";
    authCtx.OnboardingComplete(OnboardingToken);
  };

  return (
    <View style={styles.container}>
      <Image
        resizeMode="cover"
        style={styles.image}
        source={require("../../assets/images/bestFood.jpg")}
      />
      <View style={styles.imageOverlay} />
      <View style={styles.textContainer}>
        <Text style={styles.description}>
          Let get you something tasty to eat.
        </Text>
        <Pressable onPress={onboardingHandler} style={styles.nextPage}>
          <Text style={styles.getStarted}>GET STARTED</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    opacity: 0.3,
  },
  textContainer: {
    position: "absolute",
    width: "95%",
    alignSelf: "center",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    bottom: 50,
    backgroundColor: Colors.primary200,
    padding: 24,
    gap: 30,
  },
  description: {
    textAlign: "center",
    fontFamily: "OpenSans-Bold",
    fontSize: 30,
  },
  nextPage: {
    backgroundColor: "rgba(0, 0, 0, 0.97)",
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    width: "100%",
    borderRadius: 30,
  },
  getStarted: {
    color: Colors.primary100,
    fontFamily: "OpenSans-Bold",
    fontSize: 20,
  },
});
