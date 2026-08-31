import { Star } from "lucide-react-native";
import { Text, View } from "react-native";

const ReviewCard = () => {
  return (
    <View className="gap-2 p-4 bg-white rounded-xl border border-gray-200 elevation-sm">
      <View className="flex-row justify-between items-center">
        <Text className="text-2xl font-inter-bold">Amara P.</Text>

        <View className="flex-row gap-1 items-center">
          <Star size={18} color="#fd6c39" fill="#fd6c39" />
          <Text className="font-inter-bold">5.0</Text>
        </View>
      </View>

      <Text className="text-gray-500 font-inter">
        Arrived hot in 19 minutes. The smash burger is genuinely the best in the
        city.
      </Text>

      <Text className="text-sm text-gray-400 font-inter">2 days ago</Text>
    </View>
  );
};

export default ReviewCard;
