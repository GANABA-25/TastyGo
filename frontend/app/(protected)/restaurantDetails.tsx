import ReviewCard from "@/src/components/reviewCard";
import { restaurants } from "@/src/data/dummyData";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ArrowLeft,
  Bike,
  Clock,
  Heart,
  MapPin,
  Plus,
} from "lucide-react-native";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

const RestaurantDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [selectedCategory, setSelectedCategory] = useState("Popular");

  console.log(id);

  // const { data, isLoading, isError, refetch } = useFetch({
  //   queryKey: ["foodDetails"],
  //   queryFn: () => getFoodDetail(id),
  //   errorMessage: "Failed to load restaurants.",
  // });

  const restaurant = restaurants.find((restaurant) => restaurant.id === id);

  return (
    <View className="flex-1">
      <StatusBar hidden />
      <View className="relative h-[30%]">
        <Image
          source={{
            uri: "https://res.cloudinary.com/dkjlpfa1q/image/upload/v1785773761/burger4_wuiarl.jpg",
          }}
          className="w-full h-full"
          resizeMode="cover"
        />

        <View className="absolute inset-0 bg-black/30" />

        <Pressable
          onPress={() => router.back()}
          className="absolute top-5 left-5 justify-center items-center w-11 h-11 rounded-full bg-white/90"
        >
          <ArrowLeft size={21} color="#222" strokeWidth={2.2} />
        </Pressable>

        <Pressable className="absolute top-5 right-5 justify-center items-center w-11 h-11 rounded-full bg-white/90">
          <Heart size={21} color="#222" strokeWidth={2.2} />
        </Pressable>
      </View>

      <View className="overflow-hidden flex-1 p-4 bg-white">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 40,
          }}
        >
          <View className="flex-col gap-6">
            <View>
              <Text className="text-3xl font-inter-bold">Ember & Bun</Text>
              <Text>Burgers · American</Text>
            </View>

            <View className="flex-row gap-3">
              <View className="flex-1 gap-2 justify-center items-center p-4 bg-gray-100 rounded-2xl">
                <Clock size={20} color="#fd6c39" />
                <Text className="text-gray-800 font-inter-bold">18-25 min</Text>
              </View>

              <View className="flex-1 gap-2 justify-center items-center p-4 bg-gray-100 rounded-2xl">
                <Bike size={20} color="#fd6c39" />
                <Text className="text-gray-800 font-inter-bold">Free</Text>
              </View>

              <View className="flex-1 gap-2 justify-center items-center p-4 bg-gray-100 rounded-2xl">
                <MapPin size={20} color="#fd6c39" />
                <Text className="text-gray-800 font-inter-bold">1.2km</Text>
              </View>
            </View>

            <View className="flex-row gap-3">
              {["Popular", "Mains", "Sides"].map((category) => {
                const isSelected = selectedCategory === category;

                return (
                  <Pressable
                    key={category}
                    onPress={() => setSelectedCategory(category)}
                    className={`rounded-full border px-6 py-3 ${
                      isSelected
                        ? "border-primary bg-primary"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <Text
                      className={`font-inter-bold ${
                        isSelected ? "text-white" : "text-gray-700"
                      }`}
                    >
                      {category}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <View className="flex-row gap-4 items-center p-4 bg-white rounded-2xl border border-gray-200 elevation-sm">
              <Image
                source={{
                  uri: "https://res.cloudinary.com/dkjlpfa1q/image/upload/v1785773761/burger4_wuiarl.jpg",
                }}
                className="w-24 h-24 rounded-2xl"
                resizeMode="cover"
              />

              <View className="flex-1 min-w-0">
                <Text className="text-xl font-inter-bold" numberOfLines={1}>
                  Double Smash Burger
                </Text>

                <Text
                  className="mt-1 text-gray-500 font-inter"
                  numberOfLines={2}
                >
                  Two aged beef patties, molten cheddar, house pickles and
                  smoked
                </Text>

                <View className="flex-row justify-between items-center mt-3">
                  <Text className="text-primary font-inter-bold">$13.50</Text>

                  <Pressable className="justify-center items-center w-10 h-10 rounded-full bg-primary">
                    <Plus size={20} color="white" strokeWidth={2.5} />
                  </Pressable>
                </View>
              </View>
            </View>

            <View className="gap-4">
              <Text className="text-2xl font-inter-bold">Reviews</Text>
              <ReviewCard />
              <ReviewCard />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default RestaurantDetails;
