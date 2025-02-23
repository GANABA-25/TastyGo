import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.user}>Hello Nathaniel</Text>
        <View style={styles.headerLeft}>
          <Ionicons name="search" size={20} color={Colors.primary100} />
          <FontAwesome name="bell-o" size={20} color={Colors.primary100} />
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 10,
    gap: 15,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  user: {
    color: Colors.primary100,
    fontFamily: "OpenSans-Bold",
    textTransform: "capitalize",
  },
});
