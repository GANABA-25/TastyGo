import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
} from "react-native";

import { useContext } from "react";
import Colors from "../../constants/Colors";
import Button from "../../components/Button";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { CartContext } from "../../store/CartContext";

const Cart = () => {
  const cartCtx = useContext(CartContext);

  const addToCartHandler = (item) => {
    cartCtx.addToCart(item);
  };

  const removeCartItemHandler = (item) => {
    cartCtx.removeFromCart(item);
  };

  const removeItemCompletelyHandler = (item) => {
    cartCtx.removeItemCompletely(item.id);
  };

  return (
    <View style={styles.container}>
      {cartCtx.cartItems.length > 0 ? (
        <FlatList
          data={cartCtx.cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.innerContainer}>
              <View style={styles.textsContainer}>
                <Text style={styles.foodName}>{item.name}</Text>
                <Text style={styles.price}>GH₵ {item.price}</Text>
                <View style={styles.iconsContainer}>
                  <Pressable
                    onPress={() => removeCartItemHandler(item)}
                    style={styles.iconsView}
                  >
                    <Entypo name="minus" size={24} color={Colors.primary100} />
                  </Pressable>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <Pressable
                    onPress={() => addToCartHandler(item)}
                    style={styles.iconsView}
                  >
                    <Entypo name="plus" size={24} color={Colors.primary100} />
                  </Pressable>
                </View>
              </View>
              <View>
                <AntDesign
                  onPress={() => removeItemCompletelyHandler(item)}
                  style={styles.icon}
                  name="delete"
                  size={18}
                  color={Colors.primary100}
                />
                <Image style={styles.image} source={item.image} />
              </View>
            </View>
          )}
        />
      ) : (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Your cart is empty!</Text>
          <MaterialCommunityIcons
            name="flask-empty-outline"
            size={25}
            color={Colors.primary200}
          />
        </View>
      )}

      <View style={styles.priceContainer}>
        <View style={styles.priceInnerContainer}>
          <View style={styles.totalContainer}>
            <Text style={styles.priceHeaders}>SubTotal </Text>
            <Text style={styles.priceHeaders}>Delivery Charge</Text>
            <Text style={styles.priceHeaders}>Total</Text>
          </View>

          <View style={styles.totalContainer}>
            <Text style={styles.priceTexts}>GH₵ {cartCtx.subtotal}</Text>
            <Text style={styles.priceTexts}>GH₵ 30</Text>
            <Text style={styles.priceTexts}>GH₵ {cartCtx.totalPrice}</Text>
          </View>
        </View>
        <Button title="Checkout" />
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary300,
    paddingHorizontal: 5,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.primary400,
    padding: 30,
    marginVertical: 3,
    borderRadius: 20,
    elevation: 20,
  },
  textsContainer: {
    gap: 10,
  },
  foodName: {
    fontFamily: "OpenSans-Bold",
    color: Colors.primary100,
    fontSize: 20,
  },
  price: {
    fontFamily: "OpenSans-Bold",
    color: Colors.primary200,
    fontSize: 20,
  },
  iconsContainer: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  iconsView: {
    borderColor: Colors.primary200,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
  },
  quantity: {
    fontFamily: "OpenSans-Regular",
    color: Colors.primary100,
    fontSize: 20,
  },
  icon: {
    alignSelf: "flex-end",
    color: "red",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
    elevation: 20,
  },
  emptyCartContainer: {
    flex: 1,
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCartText: {
    color: Colors.primary100,
    textAlign: "center",
    fontSize: 20,
  },
  priceContainer: {
    padding: 20,
    marginTop: 10,
    backgroundColor: Colors.primary400,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    bottom: 5,
  },
  priceInnerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  totalContainer: {
    gap: 2,
  },
  priceHeaders: {
    fontFamily: "OpenSans-Bold",
    color: Colors.primary100,
    fontSize: 15,
  },
  priceTexts: {
    fontFamily: "OpenSans-Regular",
    color: Colors.primary100,
    fontSize: 15,
  },
});
