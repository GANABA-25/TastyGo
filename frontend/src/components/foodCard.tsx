import { router } from "expo-router";
import { Plus, Star } from "lucide-react-native";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { popularFoods } from "../data/dummyData";

const FoodCard = () => {
  return (
    <FlatList
      data={popularFoods}
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
                id: item.id,
              },
            })
          }
          className="w-56 overflow-hidden rounded-3xl border border-gray-200 bg-white elevation-sm"
        >
          <View className="h-36 overflow-hidden">
            <Image
              source={{ uri: item.image }}
              className="h-full w-full"
              resizeMode="cover"
            />
          </View>
          <View className="gap-2 p-4">
            <Text className="text-center font-inter-bold">{item.name}</Text>
            <View className="flex-row items-center gap-2">
              <Star size={15} color="#fd6c39" />
              <Text className="font-inter-bold">{item.rating}</Text>
            </View>

            <View className="flex-row items-center justify-between">
              <Text className="font-inter-bold text-primary">
                ${item.price.toFixed(2)}
              </Text>
              <View className="rounded-full bg-primary p-2">
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
