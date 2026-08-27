import * as Location from "expo-location";

export const requestLocationPermission = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();

  return status === Location.PermissionStatus.GRANTED;
};

export const getCurrentLocation = async () => {
  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High,
  });

  return location;
};

export const getCurrentAddress = async () => {
  const location = await getCurrentLocation();

  const addresses = await Location.reverseGeocodeAsync({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  });

  return {
    location,
    address: addresses[0],
  };
};
