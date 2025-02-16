import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Pressable onPress={() => navigation.openDrawer()}>
          <FontAwesome6
            name="bars-staggered"
            size={20}
            color={Colors.primary100}
          />
        </Pressable>
        <View style={styles.headerLeft}>
          <Ionicons name="search" size={20} color={Colors.primary100} />
          <FontAwesome name="bell-o" size={20} color={Colors.primary100} />
        </View>
      </View>
      <Text style={styles.user}>Hello Nathaniel</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
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
