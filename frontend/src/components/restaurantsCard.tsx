import { Star } from "lucide-react-native";
import { Image, Pressable, Text, View } from "react-native";
import { Restaurant } from "../data/dummyData";

type RestaurantsCardProps = {
  item: Restaurant;
};

const RestaurantsCard = ({ item }: RestaurantsCardProps) => {
  return (
    <Pressable className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white elevation-sm">
      <View className="h-36 overflow-hidden">
        <Image
          source={{ uri: item.image }}
          className="h-full w-full"
          resizeMode="cover"
        />

        <Text className="absolute right-0 bottom-0 bg-white font-inter-bold text-sm py-1 px-3 rounded-full m-4">
          {item.eta}
        </Text>
      </View>
      <View className="flex-row justify-between items-start gap-2 p-4">
        <View>
          <Text className="font-inter-bold">{item.name}</Text>
          <Text className="font-inter  text-gray-500">
            {item.tags} . {item.distance} . {item.promo}
          </Text>
        </View>

        <View className="flex-row items-center gap-2">
          <Star size={15} color="#fd6c39" />
          <Text className="font-inter-bold">{item.rating}</Text>
        </View>
      </View>

      <Text className="absolute bg-secondary font-inter text-sm py-1 px-6 rounded-full m-4">
        {item.promo}
      </Text>
    </Pressable>
  );
};

export default RestaurantsCard;
