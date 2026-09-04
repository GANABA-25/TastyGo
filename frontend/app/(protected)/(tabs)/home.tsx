import Button from "@/src/components/button";
import FoodCard from "@/src/components/foodCard";
import Input from "@/src/components/Input";
import RestaurantLoadingCard from "@/src/components/loadingCard/restaurantLoadingCard";
import RestaurantsCard from "@/src/components/restaurantsCard";
import { categories } from "@/src/data/dummyData";
import { useFetch } from "@/src/hooks/useFetch";
import { getAllRestaurants } from "@/src/util/https";
import { LinearGradient } from "expo-linear-gradient";
import {
  Bell,
  ChevronDown,
  MapPin,
  Search,
  SlidersHorizontal,
  UtensilsCrossed,
} from "lucide-react-native";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [pressedCategory, setPressedCategory] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { data, isLoading, isRefetching, isError, refetch } = useFetch({
    queryKey: ["restaurants"],
    queryFn: getAllRestaurants,
    errorMessage: "Failed to load restaurants.",
  });

  const popularFood =
    data?.restaurants.flatMap((restaurant: any) =>
      restaurant.foods.filter((food: any) => food.popular),
    ) ?? [];

  const filteredRestaurants =
    selectedCategory === "All"
      ? (data?.restaurants ?? [])
      : (data?.restaurants?.filter((restaurant: any) =>
          restaurant.tags?.includes(selectedCategory),
        ) ?? []);

  return (
    <SafeAreaView className="flex-1 bg-primary-light" edges={["top"]}>
      <View className="flex-1 bg-white">
        <View className="overflow-hidden bg-primary-light rounded-b-[28px] p-4">
          <View className="flex-row justify-between items-center">
            <Pressable className="flex-1">
              <Text className="text-gray-500 font-inter">Deliver to</Text>

              <View className="mt-2 flex-row items-center gap-1.5">
                <MapPin size={18} color="#fd6c39" strokeWidth={2.5} />

                <Text className="text-2xl capitalize font-inter-bold">
                  Achimota-mile 7
                </Text>

                <ChevronDown size={18} color="#9CA3AF" strokeWidth={2} />
              </View>
            </Pressable>

            <Pressable className="relative">
              <View className="justify-center items-center w-11 h-11 bg-white rounded-full elevation-sm">
                <Bell size={20} color="#111827" strokeWidth={2} />
              </View>

              <View className="absolute right-2.5 top-2 h-2 w-2 rounded-full bg-red-500" />
            </Pressable>
          </View>

          <View className="flex-row gap-3 items-center mt-8">
            <View className="flex-1">
              <Input
                icon={Search}
                TextInputConfig={{
                  autoCorrect: false,
                  placeholder: "Search dishes, restaurants...",
                }}
              />
            </View>

            <Pressable className="justify-center items-center w-12 h-12 rounded-full bg-primary elevation-sm">
              <SlidersHorizontal size={20} color="#fff" strokeWidth={2} />
            </Pressable>
          </View>
        </View>

        <ScrollView
          className="gap-4 p-4"
          contentContainerClassName="pb-8 gap-4"
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
              tintColor="#fd6c39"
              colors={["#fd6c39"]}
            />
          }
          showsVerticalScrollIndicator={false}
        >
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => String(item.id)}
            contentContainerClassName="flex-row gap-4"
            renderItem={({ item }) => (
              <Pressable
                onPress={() => setSelectedCategory(item.label)}
                onPressIn={() => setPressedCategory(item.label)}
                onPressOut={() => setPressedCategory(null)}
                className={`flex-row h-11 items-center justify-center rounded-full border border-gray-200 px-5 elevation-sm ${
                  item.label === selectedCategory ? "bg-primary" : "bg-white"
                } ${
                  pressedCategory === item.label
                    ? "scale-95 opacity-60"
                    : "scale-100 opacity-100"
                }`}
              >
                <Text>{item.emoji}</Text>

                <Text
                  className={`ml-2 font-inter-bold ${
                    item.label === selectedCategory
                      ? "text-white"
                      : "text-gray-800"
                  }`}
                >
                  {item.label}
                </Text>
              </Pressable>
            )}
          />

          <View className="overflow-hidden relative rounded-3xl elevation-sm">
            <LinearGradient
              colors={["#fe872f", "#FF6B35"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="gap-2 p-4"
            >
              <Text className="uppercase font-inter text-white/80">
                Tonight only
              </Text>

              <Text className="text-3xl text-white font-inter-bold">
                15% off your first order
              </Text>

              <Text className="font-inter text-white/80">
                Use code QUICK15 at checkout
              </Text>
            </LinearGradient>

            <View className="absolute left-[23rem] bottom-12 bg-white/10 w-[7rem] h-[7rem] rounded-full" />

            <View className="absolute right-[5rem] top-20 bg-white/10 w-[7rem] h-[7rem] rounded-full" />
          </View>

          <View className="flex-row justify-between items-center">
            <Text className="font-inter-bold">Popular right now</Text>
            <Text className="font-inter-bold text-primary">See all</Text>
          </View>

          <FoodCard popularFood={popularFood} />

          <Text className="font-inter-bold">Featured restaurants</Text>

          {isLoading || isRefetching ? (
            <View className="gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <RestaurantLoadingCard key={index} />
              ))}
            </View>
          ) : filteredRestaurants.length === 0 ? (
            <View className="justify-center items-center px-6 py-10 bg-gray-50 rounded-3xl border border-gray-100">
              <View className="justify-center items-center mb-4 w-16 h-16 bg-orange-100 rounded-full">
                <UtensilsCrossed size={30} color="#FF6B35" />
              </View>

              <Text className="mb-2 text-lg text-center text-gray-900 font-inter-bold">
                No restaurants found
              </Text>

              <Text className="max-w-[280px] text-center font-inter text-sm leading-5 text-gray-500">
                We couldn't fetch any restaurants at the moment. Try again
                later.
              </Text>

              <View className="mt-4">
                <Button
                  onPress={refetch}
                  isLoading={isRefetching}
                  label="View all restaurants"
                />
              </View>
            </View>
          ) : (
            <View className="gap-4">
              {filteredRestaurants.map((item: any) => (
                <RestaurantsCard key={item.id} item={item} />
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
