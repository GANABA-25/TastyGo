import AddressCard from "@/src/components/addressCard";
import { useLocation } from "@/src/hooks/useLoaction";
import { MapPinPlus } from "lucide-react-native";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const Address = () => {
  const { requestLocation, isLoading, hasPermission, address, error } =
    useLocation();

  console.log(address);

  useEffect(() => {
    if (error) {
      Toast.show({
        type: "error",
        text1: error || "Something went wrong",
      });
    }
  }, [error]);

  return (
    <SafeAreaView className="flex-1 mx-4 gap-4">
      <View>
        <AddressCard />
      </View>

      <Pressable
        onPress={requestLocation}
        disabled={isLoading}
        className="flex-row items-center justify-center gap-2 rounded-2xl border border-dashed border-primary bg-primary-light/20 p-5"
        android_ripple={{ color: "#fed7c8" }}
      >
        <MapPinPlus size={20} color="#fd6c39" />

        <Text className="font-inter-bold text-primary">
          {isLoading ? "Getting location..." : "Add New Address"}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Address;
