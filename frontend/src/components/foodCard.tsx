import { router } from "expo-router";
import { Plus, Star } from "lucide-react-native";
import { FlatList, Image, Pressable, Text, View } from "react-native";

type PopularFood = {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  price: number | string;
  category: string;
  popular: boolean;
  createdAt: Date;
  updatedAt: Date;
  extra: [];
  review: [];
};

type popularFoodProps = {
  popularFood: PopularFood[];
};

const FoodCard = ({ popularFood }: popularFoodProps) => {
  if (!popularFood) {
    return <Text>Empty</Text>;
  }

  return (
    <FlatList
      data={popularFood}
      horizontal
      nestedScrollEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      contentContainerClassName="flex-row gap-3"
      renderItem={({ item }) => (
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/foodDetail",
              params: {
                id: item?.id,
              },
            })
          }
          className="overflow-hidden w-56 bg-white rounded-3xl border border-gray-200 elevation-sm"
        >
          <View className="overflow-hidden h-36">
            <Image
              source={{ uri: item?.image }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
          <View className="gap-2 p-4">
            <Text className="font-inter-bold">{item?.name}</Text>
            <View className="flex-row gap-2 items-center">
              <Star size={15} color="#fd6c39" />
              <Text className="font-inter-bold">{item?.rating}</Text>
            </View>

            <View className="flex-row justify-between items-center">
              <Text className="font-inter-bold text-primary">
                ${item?.price}
              </Text>
              <View className="p-2 rounded-full bg-primary">
                <Plus size={20} color="white" />
              </View>
            </View>
          </View>
        </Pressable>
      )}
    />
  );
};

export default FoodCard;
