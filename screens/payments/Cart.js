import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
} from "react-native";

import { useContext } from "react";
import Colors from "../../constants/Colors";
import Button from "../../components/Button";

import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { CartContext } from "../../store/CartContext";

const Cart = () => {
  const cartCtx = useContext(CartContext);

  return (
    <View style={styles.container}>
      {cartCtx.cartItems.length > 0 ? (
        <FlatList
          data={cartCtx.cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            <View style={styles.innerContainer}>
              <View style={styles.textsContainer}>
                <Text style={styles.foodName}>{item.name} (Large)</Text>
                <Text style={styles.price}>GH₵ {item.price}</Text>
                <View style={styles.iconsContainer}>
                  <View style={styles.iconsView}>
                    <Entypo name="minus" size={24} color={Colors.primary100} />
                  </View>
                  <Text style={styles.quantity}>2</Text>
                  <View style={styles.iconsView}>
                    <Entypo name="plus" size={24} color={Colors.primary100} />
                  </View>
                </View>
              </View>
              <View>
                <AntDesign
                  style={styles.icon}
                  name="delete"
                  size={18}
                  color={Colors.primary100}
                />
                <Image style={styles.image} source={item.image} />
              </View>
            </View>;
          }}
        />
      ) : (
        <Text style={styles.emptyCartText}>Your cart is empty!</Text>
      )}

      {/* <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.innerContainer}>
          <View style={styles.textsContainer}>
            <Text style={styles.foodName}>Tacos (Large)</Text>
            <Text style={styles.price}>GH₵ 100</Text>
            <View style={styles.iconsContainer}>
              <View style={styles.iconsView}>
                <Entypo name="minus" size={24} color={Colors.primary100} />
              </View>
              <Text style={styles.quantity}>2</Text>
              <View style={styles.iconsView}>
                <Entypo name="plus" size={24} color={Colors.primary100} />
              </View>
            </View>
          </View>
          <View>
            <AntDesign
              style={styles.icon}
              name="delete"
              size={18}
              color={Colors.primary100}
            />
            <Image
              style={styles.image}
              source={require("../../assets/images/Tacos/tacos1.jpg")}
            />
          </View>
        </View>
      </ScrollView> */}

      <View style={styles.priceContainer}>
        <View style={styles.priceInnerContainer}>
          <View style={styles.totalContainer}>
            <Text style={styles.priceHeaders}>SubTotal </Text>
            <Text style={styles.priceHeaders}>Delivery Charge</Text>
            <Text style={styles.priceHeaders}>Total</Text>
          </View>

          <View style={styles.totalContainer}>
            <Text style={styles.priceTexts}>GH₵ 280</Text>
            <Text style={styles.priceTexts}>GH₵ 30</Text>
            <Text style={styles.priceTexts}>GH₵ 310</Text>
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
    justifyContent: "space-between",
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
