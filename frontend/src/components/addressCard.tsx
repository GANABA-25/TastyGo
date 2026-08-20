import { House, Trash2 } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

const AddressCard = () => {
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
          24 Rue des lias, Apt 5B, Paris 75011
        </Text>

        <Text className="font-inter text-xs text-gray-400">
          Ring twice · Third floor
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
