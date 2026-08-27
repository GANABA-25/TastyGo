import AddressCard from "@/src/components/addressCard";
import Button from "@/src/components/button";
import Input from "@/src/components/Input";
import { useLocationContext } from "@/src/store/LocationContext";
import { Search } from "lucide-react-native";
import { Text, View } from "react-native";

const LocationSheet = () => {
  const { location, requestLocation, isLoading, address } =
    useLocationContext();

  return (
    <View className="bg-white px-4 pt-5 gap-4">
      <View className="items-center">
        <View className="h-1.5 w-12 rounded-full bg-gray-300" />
      </View>

      <View>
        <Text className="font-inter-bold text-2xl">
          Where should we deliver?
        </Text>
        <Text className="mt-1 font-inter text-gray-500">
          Set your delivery location
        </Text>
      </View>

      <Button
        onPress={requestLocation}
        isLoading={isLoading}
        label="Use Current location"
      />

      <Input
        icon={Search}
        TextInputConfig={{
          autoCorrect: false,
          placeholder: "Search location",
        }}
      />

      <AddressCard address={address} />
    </View>
  );
};

export default LocationSheet;
