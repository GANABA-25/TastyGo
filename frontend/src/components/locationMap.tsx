import { useEffect, useState } from "react";
import { View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { useLocationContext } from "../store/LocationContext";

const DEFAULT_LOCATION = {
  latitude: 6.6885,
  longitude: -1.6244,
};

const LocationMap = () => {
  const { location, requestLocation, isLoading } = useLocationContext();

  const [region, setRegion] = useState<Region>({
    ...DEFAULT_LOCATION,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useEffect(() => {
    if (!location) return;

    setRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  }, [location]);

  const coordinates = location
    ? {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }
    : null;

  return (
    <View className="flex-1">
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        region={region}
        showsUserLocation={false}
        showsMyLocationButton={false}
        showsCompass={false}
        toolbarEnabled={false}
      >
        {coordinates && (
          <Marker
            coordinate={coordinates}
            title="Your location"
            anchor={{ x: 0.5, y: 1 }}
          >
            <View className="items-center">
              <View className="h-12 w-12 items-center justify-center rounded-full border-[3px] border-white bg-primary shadow-lg">
                <View className="h-5 w-5 items-center justify-center rounded-full bg-white">
                  <View className="h-2.5 w-2.5 rounded-full bg-primary" />
                </View>
              </View>

              <View className="-mt-2 h-4 w-4 rotate-45 bg-primary" />
            </View>
          </Marker>
        )}
      </MapView>

      {/* Current location button */}
      {/* <Pressable
        onPress={requestLocation}
        disabled={isLoading}
        className="absolute right-5 top-5 h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg"
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fd6c39" />
        ) : (
          <LocateFixed size={22} color="#fd6c39" strokeWidth={2.5} />
        )}
      </Pressable> */}
    </View>
  );
};

export default LocationMap;
