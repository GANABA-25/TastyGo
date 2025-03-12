import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { useState, useContext } from "react";
import { LocationContext } from "../../store/locationContext";

import Colors from "../../constants/Colors";
import Button from "../../components/Button";

import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const CheckOut = ({ navigation }) => {
  const LocationCtx = useContext(LocationContext);
  const [selectedLocation, setSelectedLocation] = useState("");

  const selectedLocationHandler = (item) => {
    setSelectedLocation(item);
  };

  const deleteLocationHandler = (id) => {
    LocationCtx.deleteLocation(id);
  };

  return (
    <View style={styles.firstContainer}>
      {LocationCtx.locations.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.addNewAddressContainer}>
            <View style={styles.bar} />
            <Pressable
              onPress={() => navigation.navigate("PickLocation")}
              style={({ pressed }) => [
                styles.addNewAddressButton,
                pressed && styles.addNewAddressButtonPressed,
              ]}
            >
              <Text style={styles.addNewAddressButtonText}>ADD A LOCATION</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <>
          <FlatList
            data={LocationCtx.locations}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.container}>
                <Pressable
                  onPress={() => selectedLocationHandler(item)}
                  style={[
                    styles.innerContainer,
                    selectedLocation.id === item.id
                      ? styles.selectLocation
                      : "",
                  ]}
                >
                  <View style={styles.locationContainer}>
                    <View style={styles.ChangeUserLocation}>
                      <View style={styles.locationDetails}>
                        <Ionicons
                          name="home"
                          size={20}
                          color={Colors.primary200}
                        />
                        <Text style={styles.text}>{item.locationType}</Text>
                      </View>

                      <MaterialIcons
                        onPress={() => deleteLocationHandler(item.id)}
                        name="delete"
                        size={24}
                        color="red"
                      />
                    </View>

                    <View style={styles.locationDetails}>
                      <MaterialCommunityIcons
                        name="email"
                        size={20}
                        color={Colors.primary200}
                      />
                      <Text style={styles.text}>{item.email}</Text>
                    </View>

                    <View style={styles.locationDetails}>
                      <FontAwesome6
                        name="phone"
                        size={20}
                        color={Colors.primary200}
                      />
                      <Text style={styles.text}>{item.phoneNumber}</Text>
                    </View>

                    <View style={styles.locationDetails}>
                      <Ionicons
                        name="location-outline"
                        size={20}
                        color={Colors.primary200}
                      />
                      <Text style={styles.text}>{item.location}</Text>
                    </View>
                  </View>
                </Pressable>
              </View>
            )}
          />

          <View style={styles.buttonContainer}>
            <Pressable
              onPress={() => navigation.navigate("PickLocation")}
              style={({ pressed }) => [
                styles.addNewAddressButton,
                pressed && styles.addNewAddressButtonPressed,
              ]}
            >
              <Text style={styles.addNewAddressButtonText}>ADD A LOCATION</Text>
            </Pressable>
            <View style={styles.nestButton}>
              <Button
                onPress={() =>
                  navigation.navigate("Payment", { selectedLocation })
                }
                title="Next"
              />
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default CheckOut;

const styles = StyleSheet.create({
  firstContainer: {
    flex: 1,
    paddingBottom: 70,
  },
  container: {
    flex: 1,
    marginHorizontal: 15,
  },
  header: {
    color: Colors.primary100,
    fontFamily: "OpenSans-Regular",
    fontSize: 20,
    marginVertical: 10,
    marginHorizontal: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyLocation: {
    color: Colors.primary100,
    fontFamily: "OpenSans-Bold",
    fontSize: 20,
  },
  innerContainer: {
    backgroundColor: Colors.primary400,
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 30,
    marginVertical: 10,
    elevation: 10,
  },
  selectLocation: {
    borderWidth: 3,
    borderColor: Colors.primary200,
    borderRadius: 20,
  },
  locationContainer: {
    gap: 15,
  },
  ChangeUserLocation: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: Colors.primary100,
    fontFamily: "OpenSans-Bold",
  },
  locationDetails: {
    flexDirection: "row",
    gap: 15,
  },
  bar: {
    backgroundColor: Colors.primary200,
    width: "15%",
    height: 5,
    borderRadius: 100,
  },
  addNewAddressContainer: {
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  addNewAddressButton: {
    backgroundColor: Colors.primary100,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 2,
  },
  addNewAddressButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
  addNewAddressButtonText: {
    color: "black",
    fontFamily: "OpenSans-Bold",
    fontSize: 15,
    textTransform: "uppercase",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    position: "absolute",
    bottom: 0.1,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  nestButton: {
    width: "50%",
  },
});
