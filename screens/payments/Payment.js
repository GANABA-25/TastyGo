import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Colors from "../../constants/Colors";
import Button from "../../components/Button";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const paymentsData = [
  { id: 1, image: require("../../assets/images/payments/visa.png") },
  { id: 2, image: require("../../assets/images/payments/master.png") },
];

const OtherPaymentsData = [
  {
    id: 3,
    image: require("../../assets/images/payments/mtn.png"),
    name: "MTN",
  },
  {
    id: 4,
    image: require("../../assets/images/payments/telecel.webp"),
    name: "Telecel",
  },
  {
    id: 5,
    image: require("../../assets/images/payments/airtelTigo.webp"),
    name: "AirtelTigo",
  },
  {
    id: 6,
    image: require("../../assets/images/payments/cash.png"),
    name: "Cash",
  },
];

const Payment = ({ navigation, route }) => {
  const { selectedLocation } = route.params;
  const [selectPaymentMethod, setSelectPaymentMethod] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const selectedPaymentMethodHandler = (item) => {
    setSelectedPaymentMethod(item);
    setSelectPaymentMethod((prev) => (prev === item.id ? null : item.id));
  };

  const PaymentHandler = () => {
    navigation.navigate("OrderReview", {
      selectedPaymentMethod,
      selectedLocation,
    });
  };

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.paymentText}>Select your payment method</Text>
        <View>
          <Text style={styles.paymentText}>Cards</Text>
          <FlatList
            data={paymentsData}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => selectedPaymentMethodHandler(item)}
                style={[
                  styles.cardContainer,
                  selectPaymentMethod === item.id && styles.selectedPayment,
                ]}
              >
                <Image source={item.image} style={styles.image} />
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={styles.methodsContainer}>
          <Text style={styles.methodHeader}>Other Methods</Text>
          {OtherPaymentsData.map((paymentData) => (
            <TouchableOpacity
              key={paymentData.id}
              onPress={() => selectedPaymentMethodHandler(paymentData)}
              style={styles.methodsInnerContainer}
            >
              <View style={styles.otherPayments}>
                <Image source={paymentData.image} style={styles.methodImage} />
                <Text style={styles.methodsText}>{paymentData.name}</Text>
              </View>

              <FontAwesome
                name={
                  selectPaymentMethod === paymentData.id ? "circle" : "circle-o"
                }
                size={20}
                color={Colors.primary200}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button onPress={PaymentHandler} title="Pay Now" />
      </View>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  paymentText: {
    color: Colors.primary100,
    fontFamily: "OpenSans-Bold",
    marginVertical: 10,
    fontSize: 15,
  },
  image: {
    width: 290,
    height: 200,
  },
  cardContainer: {
    borderColor: Colors.primary100,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedPayment: {
    borderWidth: 1,
    borderColor: Colors.primary200,
    borderRadius: 20,
  },
  methodsContainer: {
    gap: 10,
  },
  methodHeader: {
    color: Colors.primary100,
    paddingVertical: 10,
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
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
});
