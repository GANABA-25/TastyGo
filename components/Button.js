import { View, Text, Pressable, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const Button = ({ title, onPress }) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary200,
    borderRadius: 30,
    padding: 12,
    width: "80%",
    margin: "auto",
  },
  text: {
    color: Colors.primary100,
    fontSize: 20,
    textAlign: "center",
    fontFamily: "OpenSans-Bold",
  },
});
