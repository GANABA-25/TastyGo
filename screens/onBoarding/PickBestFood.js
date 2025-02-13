import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const PickBestFood = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        resizeMode="cover"
        style={styles.image}
        source={require("../../assets/images/bestFood.jpg")}
      />
      <View style={styles.imageOverlay} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>Pick the best food</Text>
        <Text style={styles.description}>
          Discover the best foods at your location
        </Text>
        <View style={styles.nextPage}>
          <Text
            onPress={() => navigation.navigate("FastDelivery")}
            style={styles.skipText}
          >
            Skip
          </Text>
          <View style={styles.icon}>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={45}
              color="white"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default PickBestFood;

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
    gap: 12,
  },
  text: {
    fontFamily: "OpenSans-Bold",
    fontSize: 30,
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    fontFamily: "OpenSans-Light",
    fontSize: 25,
  },
  nextPage: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  skipText: {
    fontSize: 18,
    color: "black",
    fontFamily: "OpenSans-Bold",
  },
  icon: {
    backgroundColor: "black",
    borderRadius: 30,
    padding: 5,
  },
});
