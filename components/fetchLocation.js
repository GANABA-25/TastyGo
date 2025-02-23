import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
  reverseGeocodeAsync,
  PermissionStatus,
} from "expo-location";
import { Alert } from "react-native";

export const fetchLocation = async () => {
  const verifyPermissions = async () => {
    const { status } = await requestForegroundPermissionsAsync();
    if (status === PermissionStatus.UNDETERMINED) {
      const { granted } = await requestForegroundPermissionsAsync();
      return granted;
    }

    if (status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permission!",
        "You need to grant location permissions to pick a location."
      );
      return false;
    }

    return true;
  };

  const hasPermission = await verifyPermissions();

  if (!hasPermission) {
    return null;
  }

  try {
    const location = await getCurrentPositionAsync();

    const { latitude, longitude } = location.coords;

    const addressArray = await reverseGeocodeAsync({ latitude, longitude });

    if (addressArray.length > 0) {
      const { city, region, country } = addressArray[0];
      const address = `${city}, ${region}, ${country}`;

      return {
        lat: latitude,
        lng: longitude,
        address,
      };
    } else {
      console.log("Location not found");
      return {
        lat: latitude,
        lng: longitude,
        address: "Unknown location",
      };
    }
  } catch (error) {
    console.error("Error fetching location:", error);
    Alert.alert("Could not fetch location!", "Please try again later.");
    return null;
  }
};
