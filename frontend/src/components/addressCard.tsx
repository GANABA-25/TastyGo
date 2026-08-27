import { House, Trash2 } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

type AddressData = {
  city: string | null;
  country: string | null;
  district: string | null;
  formattedAddress: string | null;
  isoCountryCode: string | null;
  name: string | null;
  postalCode: string | null;
  region: string | null;
  street: string | null;
  streetNumber: string | null;
  subregion: string | null;
  timezone: string | null;
};

type AddressCardProps = {
  address: AddressData | null;
};

const AddressCard = ({ address }: AddressCardProps) => {
  if (!address) {
    return null;
  }

  const streetAddress = [address.streetNumber, address.street]
    .filter(Boolean)
    .join(" ");

  const locationAddress =
    streetAddress ||
    address.formattedAddress ||
    [address.district, address.city, address.region].filter(Boolean).join(", ");
  return (
    <View className="flex-row items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 elevation-sm">
      <View className="h-11 w-11 items-center justify-center rounded-full bg-primary-light">
        <House size={20} color="#fd6c39" />
      </View>

      <View className="flex-1 gap-1">
        <View className="flex-row items-center gap-2">
          <Text className="font-inter-bold text-2xl">Home</Text>
          <Text className="font-inter text-xs text-white bg-green-600 p-1 rounded-full px-3">
            Default
          </Text>
        </View>

        <Text
          className="font-inter text-sm leading-5 text-gray-500"
          numberOfLines={2}
        >
          {locationAddress}
        </Text>

        <Text className="font-inter text-xs text-gray-400">
          {[address.district, address.city, address.region]
            .filter(Boolean)
            .join(" · ")}
        </Text>
      </View>

      <Pressable
        className="h-10 w-10 items-center justify-center rounded-full bg-gray-100"
        hitSlop={8}
      >
        <Trash2 size={17} color="#EF4444" />
      </Pressable>
    </View>
  );
};

export default AddressCard;
