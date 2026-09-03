import RestaurantDetailsLoading from "@/src/components/loadingCard/RestaurantDetailsLoading";
import ReviewCard from "@/src/components/reviewCard";
import { useFetch } from "@/src/hooks/useFetch";
import { getRestaurantData } from "@/src/util/https";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ArrowLeft,
  Bike,
  Clock,
  Heart,
  MapPin,
  Plus,
  Star,
} from "lucide-react-native";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

const RestaurantDetailsError = ({ onRetry }: { onRetry: () => void }) => {
  return (
    <View className="flex-1 justify-center items-center px-6 bg-white">
      {" "}
      <StatusBar hidden />{" "}
      <View className="justify-center items-center mb-5 w-16 h-16 bg-red-50 rounded-full">
        {" "}
        <Text className="text-2xl">!</Text>{" "}
      </View>{" "}
      <Text className="mb-2 text-xl text-center font-inter-bold">
        {" "}
        Couldn't load restaurant{" "}
      </Text>{" "}
      <Text className="mb-6 text-center text-gray-500 font-inter">
        {" "}
        Something went wrong while loading this restaurant.{" "}
      </Text>{" "}
      <Pressable
        onPress={onRetry}
        className="px-6 py-3 rounded-full bg-primary"
      >
        {" "}
        <Text className="text-white font-inter-bold">Try again</Text>{" "}
      </Pressable>{" "}
    </View>
  );
};

const RestaurantDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [selectedCategory, setSelectedCategory] = useState("Popular");

  const { data, isLoading, isError, refetch } = useFetch({
    queryKey: ["restaurantData"],
    queryFn: () => getRestaurantData(id),
    errorMessage: "Failed to load restaurants.",
  });

  console.log("checking data", data?.data.foods);

  if (isLoading) {
    return <RestaurantDetailsLoading />;
  }

  if (isError) {
    return <RestaurantDetailsError onRetry={() => refetch()} />;
  }

  return (
    <View className="flex-1">
      <StatusBar hidden />
      <View className="relative h-[30%]">
        <Image
          source={{
            uri: data?.data?.image,
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
            <View className="flex-row justify-between items-start">
              <View>
                <Text className="text-3xl font-inter-bold">
                  {data?.data?.name}
                </Text>
                <Text>Burgers · American</Text>
              </View>

              <View className="flex-row gap-2 items-center">
                <Star size={20} color="#fd6c39" fill="#fd6c39" />
                <Text className="font-inter-bold">{data.data?.rating}</Text>
              </View>
            </View>

            <View className="flex-row gap-3">
              <View className="flex-1 gap-2 justify-center items-center p-4 bg-gray-100 rounded-2xl">
                <Clock size={20} color="#fd6c39" />
                <Text className="text-gray-800 font-inter-bold">
                  {data?.data?.eta}
                </Text>
              </View>

              <View className="flex-1 gap-2 justify-center items-center p-4 bg-gray-100 rounded-2xl">
                <Bike size={20} color="#fd6c39" />
                <Text className="text-gray-800 font-inter-bold">
                  {data?.data?.deliveryFee}
                </Text>
              </View>

              <View className="flex-1 gap-2 justify-center items-center p-4 bg-gray-100 rounded-2xl">
                <MapPin size={20} color="#fd6c39" />
                <Text className="text-gray-800 font-inter-bold">
                  {data?.data?.distance}
                </Text>
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
            {data?.data?.foods.map((dish: any) => (
              <View
                key={dish.id}
                className="flex-row gap-4 items-center p-4 bg-white rounded-2xl border border-gray-200 elevation-sm"
              >
                <Image
                  source={{
                    uri: "https://res.cloudinary.com/dkjlpfa1q/image/upload/v1785773761/burger4_wuiarl.jpg",
                  }}
                  className="w-24 h-24 rounded-2xl"
                  resizeMode="cover"
                />

                <View className="flex-1 min-w-0">
                  <Text className="text-xl font-inter-bold" numberOfLines={1}>
                    {dish.name}
                  </Text>

                  <Text
                    className="mt-1 text-gray-500 font-inter"
                    numberOfLines={2}
                  >
                    {dish.description}
                  </Text>

                  <View className="flex-row justify-between items-center mt-3">
                    <Text className="text-primary font-inter-bold">
                      ${dish.price}
                    </Text>

                    <Pressable className="justify-center items-center w-10 h-10 rounded-full bg-primary">
                      <Plus size={20} color="white" strokeWidth={2.5} />
                    </Pressable>
                  </View>
                </View>
              </View>
            ))}

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
