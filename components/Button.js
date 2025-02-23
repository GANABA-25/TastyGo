import { View, Text, Pressable, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const Button = ({ title, onPress }) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.button, // Base style
          pressed && styles.buttonPressed, // Apply pressed style when pressed
        ]}
      >
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
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  text: {
    color: Colors.primary100,
    fontSize: 20,
    textAlign: "center",
    fontFamily: "OpenSans-Bold",
  },
});
