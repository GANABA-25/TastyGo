import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { useState } from "react";
import Colors from "../../constants/Colors";
import Button from "../../components/Button";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const paymentsData = [
  { id: 1, image: require("../../assets/images/payments/visa.png") },
  { id: 2, image: require("../../assets/images/payments/master.png") },
];

const OtherPaymentsData = [
  {
    id: 1,
    image: require("../../assets/images/payments/mtn.png"),
    name: "MTN",
  },
  {
    id: 2,
    image: require("../../assets/images/payments/telecel.webp"),
    name: "Telecel",
  },
  {
    id: 3,
    image: require("../../assets/images/payments/airtelTigo.webp"),
    name: "AirtelTigo",
  },
  {
    id: 4,
    image: require("../../assets/images/payments/cash.png"),
    name: "Cash",
  },
];

const Payment = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [selectedCardPayment, setSelectedCardPayment] = useState(null);

  const selectedPaymentMethodHandler = (id) => {
    if (selectedCardPayment) {
      console.log("You can only use one PaymentMethod");
    } else {
      setSelectedPaymentMethod(id);
    }
  };

  const selectedCardPaymentHandler = (id) => {
    setSelectedCardPayment(id);
    setSelectedPaymentMethod(null);
  };

  const PaymentHandler = () => {
    console.log("payment Handler");
  };

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.paymentText}>Select your method of payment</Text>

        <View>
          <Text style={styles.paymentText}>Cards</Text>
          <FlatList
            data={paymentsData}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Pressable
                key={item.id}
                onPress={() => selectedCardPaymentHandler(item.id)}
                style={[
                  styles.cardContainer,
                  selectedCardPayment === item.id
                    ? styles.selectedPayment
                    : null,
                ]}
              >
                <Image source={item.image} style={styles.image} />
              </Pressable>
            )}
          />
        </View>

        <View style={styles.methodsContainer}>
          <Text style={styles.methodHeader}>Other Methods</Text>
          {OtherPaymentsData.map((paymentData) => (
            <Pressable
              key={paymentData.id}
              onPress={() => selectedPaymentMethodHandler(paymentData.id)}
              style={styles.methodsInnerContainer}
            >
              <View style={styles.otherPayments}>
                <Image source={paymentData.image} style={styles.methodImage} />
                <Text style={styles.methodsText}>{paymentData.name}</Text>
              </View>

              <FontAwesome
                name={
                  selectedPaymentMethod === paymentData.id
                    ? "circle"
                    : "circle-o"
                }
                size={20}
                color={Colors.primary200}
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {/* Fixed button at the bottom */}
      <View style={styles.buttonContainer}>
        <Button onPress={PaymentHandler} title="Pay Now" />
      </View>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  screen: {
    flex: 1, // Makes sure the main container takes full height
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20, // Adds spacing above button
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
    borderWidth: 3,
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
    padding: 15,
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
