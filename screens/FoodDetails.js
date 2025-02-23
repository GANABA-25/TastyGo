import { useState, useContext } from "react";
import { useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import Colors from "../constants/Colors";

import { CartContext } from "../store/CartContext";

import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const FoodDetails = ({ navigation }) => {
  const cartCtx = useContext(CartContext);
  const [selectedItem, setSelectedItem] = useState(null);
  const route = useRoute();
  const { foodItem } = route.params;

  const toggleCheckbox = (item) => {
    setSelectedItem(item === selectedItem ? null : item);
  };

  const addToCartHandler = () => {
    cartCtx.addToCart(foodItem);
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          style={styles.image}
          source={foodItem.image}
          resizeMode="cover"
        />
        <View style={styles.imageOverlay} />
        <View style={styles.icons}>
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={24}
            color={Colors.primary100}
            style={styles.iconLeft}
          />

          <View style={styles.iconRight}>
            <Ionicons name="cart-outline" size={20} color={Colors.primary200} />
            <Text style={styles.cartMessage}>{cartCtx.totalQuantity}</Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.titleAndPrice}>
          <Text style={styles.foodName}>{foodItem.name}</Text>
          <Text style={styles.price}>${foodItem.price.toFixed(2)}</Text>
        </View>

        <View style={styles.timerContainer}>
          <View style={styles.time}>
            <View style={styles.innerTimer}>
              <FontAwesome name="circle" size={15} color={Colors.primary200} />
              <Text style={styles.text}>{foodItem.time}</Text>
            </View>

            <View style={styles.innerTimer}>
              <MaterialCommunityIcons
                name="timer-outline"
                size={15}
                color={Colors.primary200}
              />
              <Text style={styles.text}>{foodItem.time} remains</Text>
            </View>
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>Description</Text>
          <Text style={styles.text}>{foodItem.description}</Text>
        </View>

        <View style={styles.itemsContainer}>
          <Text style={styles.chooseItem}>Choose 1 item</Text>

          {[foodItem.item1, foodItem.item2, foodItem.item3].map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.checkboxContainer}
              onPress={() => toggleCheckbox(item)}
            >
              <Ionicons
                name={selectedItem === item ? "checkbox" : "square-outline"}
                size={20}
                color={Colors.primary200}
              />
              <Text style={styles.text}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.addToCart}>
        <Pressable style={styles.amount}>
          <Text style={styles.price}>${foodItem.price.toFixed(2)}</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.addToCartButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={addToCartHandler}
        >
          <Text style={styles.buttonText}>Tap to add to cart</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default FoodDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary300,
  },
  innerContainer: {
    position: "relative",
    height: 300,
    width: "100%",
    overflow: "hidden",
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  icons: {
    position: "absolute",
    width: "100%",
    top: 20,
  },
  iconLeft: {
    position: "absolute",
    left: 15,
  },
  iconRight: {
    position: "absolute",
    flexDirection: "row",
    right: 15,
  },
  cartMessage: {
    fontFamily: "OpenSans-Bold",
    alignSelf: "flex-end",
    color: Colors.primary200,
    bottom: 15,
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 80,
  },
  titleAndPrice: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    alignItems: "center",
  },
  foodName: {
    color: Colors.primary100,
    fontSize: 20,
    fontFamily: "OpenSans-Bold",
  },
  text: {
    color: Colors.primary100,
    fontSize: 13,
    fontFamily: "OpenSans-Regular",
  },
  buttonText: {
    color: Colors.primary400,
    fontSize: 13,
    fontFamily: "OpenSans-Regular",
  },
  addToCartButton: {
    backgroundColor: Colors.primary100,
    padding: 7,
    borderRadius: 10,
    elevation: 5,
    shadowColor: Colors.primary200,
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
  time: {
    flexDirection: "row",
    gap: 20,
  },
  price: {
    color: Colors.primary100,
    fontSize: 20,
    fontFamily: "OpenSans-Bold",
    textAlign: "center",
  },
  timerContainer: {
    marginTop: 10,
  },
  innerTimer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  descriptionContainer: {
    marginTop: 20,
  },
  description: {
    color: Colors.primary100,
    fontSize: 20,
    fontFamily: "OpenSans-Bold",
    marginBottom: 5,
  },
  itemsContainer: {
    gap: 10,
    marginTop: 20,
  },
  chooseItem: {
    color: Colors.primary100,
    fontSize: 20,
    fontFamily: "OpenSans-Bold",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 5,
  },
  amount: {
    backgroundColor: Colors.primary200,
    padding: 5,
    borderRadius: 10,
    width: "30%",
  },
  addToCart: {
    position: "absolute",
    width: "100%",
    bottom: 2,
    backgroundColor: Colors.primary400,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
});
