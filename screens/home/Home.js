import { View, Text, StyleSheet, Image } from "react-native";

import Header from "../../components/Header";
import Category from "./Category";
import Colors from "../../constants/Colors";

const Home = () => {
  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.innerContainer}>
        <View style={styles.imageTextContainer}>
          <Image
            source={require("../../assets/images/burger7.jpg")}
            style={styles.image}
          />
          <View style={styles.imageOverlay} />
          <View style={styles.TextContainer}>
            <Text style={styles.vendor}>Big Shark</Text>
            <Text style={styles.title}>Special Burger</Text>
            <Text style={styles.amount}>$12</Text>
          </View>
        </View>
      </View>

      <Category />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary300,
    gap: 10,
  },
  innerContainer: {
    gap: 10,
    paddingBottom: 10,
  },
  imageTextContainer: {
    marginHorizontal: 10,
    position: "relative",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 250,
    objectFit: "cover",
    borderRadius: 30,
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    opacity: 0.3,
    borderRadius: 30,
  },
  TextContainer: {
    position: "absolute",
    top: 20,
    left: 20,
    gap: 5,
  },
  vendor: {
    color: Colors.primary100,
    fontSize: 18,
    fontFamily: "OpenSans-Bold",
    textTransform: "capitalize",
  },
  title: {
    color: Colors.primary100,
    fontSize: 13,
    fontFamily: "OpenSans-Regular",
  },
  amount: {
    color: Colors.primary100,
    fontSize: 13,
    fontFamily: "OpenSans-Regular",
  },
});
