import { router } from "expo-router";
import { Star } from "lucide-react-native";
import { Image, Pressable, Text, View } from "react-native";
import { Restaurant } from "../data/dummyData";

type RestaurantsCardProps = {
  item: Restaurant;
};

const RestaurantsCard = ({ item }: RestaurantsCardProps) => {
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/restaurantDetails",
          params: {
            id: item.id,
          },
        })
      }
      className="overflow-hidden relative bg-white rounded-3xl border border-gray-200 elevation-sm"
    >
      <View className="overflow-hidden h-36">
        <Image
          source={{ uri: item.image }}
          className="w-full h-full"
          resizeMode="cover"
        />

        <Text className="absolute right-0 bottom-0 px-3 py-1 m-4 text-sm bg-white rounded-full font-inter-bold">
          {item.eta}
        </Text>
      </View>
      <View className="flex-row gap-2 justify-between items-start p-4">
        <View>
          <Text className="font-inter-bold">{item.name}</Text>
          <Text className="text-gray-500 font-inter">
            {item.tags} . {item.distance} . {item.promo}
          </Text>
        </View>

        <View className="flex-row gap-2 items-center">
          <Star size={15} color="#fd6c39" />
          <Text className="font-inter-bold">{item.rating}</Text>
        </View>
      </View>

      <Text className="absolute px-6 py-1 m-4 text-sm rounded-full bg-secondary font-inter">
        {item.promo}
      </Text>
    </Pressable>
  );
};

export default RestaurantsCard;
