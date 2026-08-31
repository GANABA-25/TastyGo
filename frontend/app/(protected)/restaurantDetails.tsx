import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft, Heart } from "lucide-react-native";
import { Image, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const RestaurantDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  // const { data, isLoading, isError, refetch } = useFetch({
  //   queryKey: ["foodDetails"],
  //   queryFn: () => getFoodDetail(id),
  //   errorMessage: "Failed to load restaurants.",
  // });

  return (
    <SafeAreaView className="flex-1">
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
    </SafeAreaView>
  );
};

export default RestaurantDetails;
