import LocationMap from "@/src/components/locationMap";
import { router } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

const Address = () => {
  useEffect(() => {
    router.push("/location-sheet");
  }, [0]);
  return (
    <View className="flex-1 bg-white">
      <LocationMap />
    </View>
  );
};

export default Address;
