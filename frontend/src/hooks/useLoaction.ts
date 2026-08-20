import * as Location from "expo-location";
import { useState } from "react";
import {
  getCurrentAddress,
  requestLocationPermission,
} from "../services/location/location-service";

export const useLocation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [address, setAddress] =
    useState<Location.LocationGeocodedAddress | null>(null);
  const [error, setError] = useState<string | null>(null);

  const requestLocation = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const permission = await requestLocationPermission();

      setHasPermission(permission);

      if (!permission) {
        setError("Location permission was not granted.");
        return;
      }

      const result = await getCurrentAddress();

      setLocation(result.location);
      setAddress(result.address ?? null);
    } catch (error) {
      console.error("Location error:", error);
      setError("Unable to get your current location.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    requestLocation,
    isLoading,
    hasPermission,
    location,
    address,
    error,
  };
};
