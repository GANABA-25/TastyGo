import { Star } from "lucide-react-native";
import { Text, View } from "react-native";
import { formatDate } from "../types/format.date";

type Review = {
  id: string;
  restaurantId: string;
  name: string;
  rating: number;
  text: string;
  createdAt: string;
};

type ReviewProps = {
  review: Review;
};

const ReviewCard = ({ review }: ReviewProps) => {
  return (
    <View className="gap-2 p-4 bg-white rounded-xl border border-gray-200 elevation-sm">
      <View className="flex-row justify-between items-center">
        <Text className="text-2xl font-inter-bold">{review?.name}</Text>

        <View className="flex-row gap-1 items-center">
          <Star size={18} color="#fd6c39" fill="#fd6c39" />
          <Text className="font-inter-bold">{review?.rating}</Text>
        </View>
      </View>

      <Text className="text-gray-500 font-inter">{review?.text}</Text>

      <Text className="text-sm text-gray-400 font-inter">
        {formatDate(review?.createdAt)}
      </Text>
    </View>
  );
};

export default ReviewCard;
