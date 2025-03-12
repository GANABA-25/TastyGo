import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState, useContext } from "react";
import RNPickerSelect from "react-native-picker-select";
import { LocationContext } from "../store/locationContext";

import Input from "../components/Input";
import Button from "../components/Button";
import Colors from "../constants/Colors";

import Entypo from "@expo/vector-icons/Entypo";

import { fetchLocation } from "../components/fetchLocation";

const PickLocation = ({ navigation }) => {
  const locationCtx = useContext(LocationContext);
  const [userLocation, setUserLocation] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [locationData, setLocationData] = useState({
    email: "",
    phoneNumber: "",
    location: "",
    locationType: "",
  });

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setLocationData((prevState) => ({
      ...prevState,
      [inputIdentifier]: enteredValue,
    }));
  };

  const pickedLocationHandler = async () => {
    setIsLoading(true);

    try {
      const fetchedLocationUserLocation = await fetchLocation();

      if (fetchedLocationUserLocation) {
        setUserLocation(fetchedLocationUserLocation);
      } else {
        setUserLocation(null);
        Alert.alert(
          "Location Error",
          "Could not fetch location. Please try again."
        );
      }
    } catch (error) {
      setUserLocation(null);
      Alert.alert(
        "Unexpected Error",
        "Something went wrong fetching location."
      );
      console.error(error);
    }

    setIsLoading(false);
  };

  const SubmitHandler = () => {
    if (!userLocation) {
      console.log("Pick a Location first ");
    } else {
      setLocationData((prevState) => ({
        ...prevState,
        location: userLocation.address,
      }));

      const locationWithId = {
        ...locationData,
        location: userLocation.address,
        id: Date.now().toString(),
      };

      locationCtx.addLocations(locationWithId);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Input
          label="Place Address"
          icon="mail-outline"
          type="text"
          TextInputConfig={{
            autoCorrect: false,
            placeholder: "Enter Your Email Address",
            value: locationData.email,
            onChangeText: inputChangeHandler.bind(this, "email"),
          }}
        />
        <Input
          label="Phone Number"
          icon="call-sharp"
          type="number"
          TextInputConfig={{
            keyboardType: "numeric",
            autoCorrect: false,
            placeholder: "Enter Phone Number",
            value: locationData.phoneNumber,
            onChangeText: inputChangeHandler.bind(this, "phoneNumber"),
          }}
        />

        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Select Location Type</Text>
          <RNPickerSelect
            onValueChange={(value) => inputChangeHandler("locationType", value)}
            items={[
              { label: "Home", value: "Home" },
              { label: "Work", value: "Work" },
            ]}
            style={pickerSelectStyles}
            placeholder={{
              label: "Choose location type...",
              value: null,
            }}
          />
        </View>

        <TouchableOpacity
          onPress={pickedLocationHandler}
          style={styles.currentLocation}
        >
          <View style={styles.currentLocationContent}>
            <Text style={styles.currentLocationText}>
              Pick Current Location
            </Text>
            {isLoading && (
              <ActivityIndicator size="small" color={Colors.primary200} />
            )}
          </View>
        </TouchableOpacity>

        <View>
          {!userLocation ? (
            <View style={styles.userLocation}>
              <Entypo name="location" size={24} color={Colors.primary100} />
              <Text style={styles.location}>No Location Picked</Text>
            </View>
          ) : (
            <View style={styles.userLocation}>
              <Entypo name="location" size={24} color={Colors.primary100} />
              <Text style={styles.location}>{userLocation.address}</Text>
            </View>
          )}
        </View>
        <Button onPress={SubmitHandler} title="Add Location" />
      </View>
    </View>
  );
};

export default PickLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 30,
  },
  innerContainer: {
    gap: 20,
  },
  pickerContainer: {
    gap: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  pickerLabel: {
    fontFamily: "OpenSans-Bold",
    fontSize: 15,
    color: Colors.primary100,
  },
  currentLocation: {
    backgroundColor: Colors.primary100,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
    overflow: "hidden",
  },

  currentLocationContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  currentLocationText: {
    fontFamily: "OpenSans-Bold",
    fontSize: 12,
    textTransform: "uppercase",
    color: Colors.primary400,
  },
  userLocation: {
    width: "100%",
    gap: 10,
    alignItems: "center",
    backgroundColor: Colors.primary200,
    paddingVertical: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  location: {
    fontFamily: "OpenSans-Bold",
    fontSize: 15,
    textAlign: "center",
    color: Colors.primary100,
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    borderColor: Colors.primary100,
    borderRadius: 8,
    color: Colors.primary100,
    backgroundColor: Colors.primary200,
  },
  inputAndroid: {
    fontSize: 16,
    borderColor: Colors.primary200,
    borderRadius: 8,
    color: Colors.primary100,
    backgroundColor: Colors.primary200,
  },
};
