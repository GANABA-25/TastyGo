import { View, Text, StyleSheet, Image } from "react-native";
import Colors from "../../constants/Colors";
import Button from "../../components/Button";

import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";

const OrderReview = ({ navigation, route }) => {
  const { selectedPaymentMethod, selectedLocation } = route.params;

  console.log(selectedPaymentMethod);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.deliveryText}>Delivery Address</Text>
        <View style={styles.borderContainer}>
          <View style={styles.selectedLocationInnerContainer}>
            <View style={styles.selectedLocation}>
              <Ionicons name="home" size={15} color={Colors.primary200} />
              <Text style={styles.place}>{selectedLocation.locationType}</Text>
            </View>

            <View>
              <AntDesign name="edit" size={20} color={Colors.primary100} />
            </View>
          </View>
          <Text style={styles.route}>{selectedLocation.location}</Text>
        </View>

        {selectedPaymentMethod.id === 1 || selectedPaymentMethod.id === 2 ? (
          <Image source={selectedPaymentMethod.image} style={styles.image} />
        ) : (
          <View style={styles.borderContainer}>
            <Text style={styles.otherMethod}>Other Methods</Text>
            <View style={styles.methodsInnerContainer}>
              <View style={styles.otherPayments}>
                <Image
                  source={selectedPaymentMethod.image}
                  style={styles.methodImage}
                />
                <Text style={styles.methodsText}>
                  {selectedPaymentMethod.name}
                </Text>
              </View>
              <AntDesign name="edit" size={15} color={Colors.primary100} />
            </View>
          </View>
        )}

        <View style={styles.borderContainer}>
          <Text style={styles.orderHeader}>Your Order</Text>
          <View style={styles.orderItemContainer}>
            <Image
              source={require("../../assets/images/orderBag.png")}
              style={styles.orderImage}
            />
            <View>
              <View style={styles.items}>
                <Text style={styles.orderItem}>Tacos</Text>
                <Text style={styles.orderQuantity}>2x</Text>
              </View>
              <View style={styles.items}>
                <Text style={styles.orderItem}>Burger</Text>
                <Text style={styles.orderQuantity}>2x</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.priceContainer}>
          <View style={styles.priceInnerContainer}>
            <View style={styles.totalContainer}>
              <Text style={styles.priceHeaders}>SubTotal </Text>
              <Text style={styles.priceHeaders}>Delivery Charge</Text>
              <Text style={styles.priceHeaders}>Total</Text>
            </View>

            <View style={styles.totalContainer}>
              <Text style={styles.priceTexts}>GH₵ 200</Text>
              <Text style={styles.priceTexts}>GH₵ 30</Text>
              <Text style={styles.priceTexts}>GH₵ 230</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.bottomButtonContainer}>
        <Button
          // onPress={() => navigation.navigate("CheckOut")}
          title="Place Order"
        />
      </View>
    </View>
  );
};

export default OrderReview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  contentContainer: {
    flex: 1,
  },
  bottomButtonContainer: {
    bottom: 15,
  },
  deliveryText: {
    color: Colors.primary100,
    fontFamily: "OpenSans-Bold",
    fontSize: 15,
  },
  image: {
    width: 290,
    height: 200,
  },
  borderContainer: {
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.primary200,
    paddingBottom: 20,
  },
  selectedLocationInnerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedLocation: {
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  place: {
    fontFamily: "OpenSans-Regular",
    color: Colors.primary100,
    fontSize: 15,
  },
  route: {
    fontFamily: "OpenSans-Regular",
    color: Colors.primary100,
    fontSize: 15,
  },
  otherMethod: {
    color: Colors.primary100,
    paddingVertical: 20,
    fontFamily: "OpenSans-Bold",
    fontSize: 15,
  },
  methodsInnerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.primary400,
    padding: 20,
    borderRadius: 10,
  },
  otherPayments: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  methodsText: {
    color: Colors.primary200,
  },
  methodImage: {
    width: 20,
    height: 20,
  },
  orderImage: {
    width: 60,
    height: 60,
  },
  orderHeader: {
    color: Colors.primary100,
    fontFamily: "OpenSans-Bold",
    fontSize: 20,
    paddingVertical: 20,
  },
  orderItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  orderItem: {
    color: Colors.primary100,
    fontFamily: "OpenSans-Regular",
    fontSize: 15,
  },
  orderQuantity: {
    color: Colors.primary100,
    fontFamily: "OpenSans-Regular",
    fontSize: 15,
  },
  items: {
    flexDirection: "row",
    gap: 10,
  },
  priceContainer: {
    paddingVertical: 30,
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
    fontSize: 20,
    opacity: 0.9,
  },
  priceTexts: {
    fontFamily: "OpenSans-Regular",
    color: Colors.primary100,
    fontSize: 20,
    opacity: 0.9,
  },
});
