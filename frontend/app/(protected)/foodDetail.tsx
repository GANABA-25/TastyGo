import FoodDetailSkeleton from "@/src/components/loadingCard/foodDetialsSkeleton";
import TextArea from "@/src/components/textArea";
import { useFetch } from "@/src/hooks/useFetch";
import { getFoodDetail } from "@/src/util/https";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ArrowLeft,
  Check,
  Heart,
  Minus,
  Plus,
  Star,
} from "lucide-react-native";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

const foodDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState("Regular");

  const { data, isLoading, isError, refetch } = useFetch({
    queryKey: ["foodDetails"],
    queryFn: () => getFoodDetail(id),
    errorMessage: "Failed to load food details.",
  });

  if (isLoading) {
    return (
      <>
        <StatusBar hidden />
        <FoodDetailSkeleton />
      </>
    );
  }

  if (isError || !data?.foodDetail) {
    return (
      <View className="flex-1 justify-center items-center px-6 bg-white">
        <Text className="mb-4 text-lg text-center font-inter-bold">
          Failed to load food details
        </Text>

        <Pressable
          onPress={() => refetch()}
          className="px-6 py-3 rounded-full bg-primary"
        >
          <Text className="text-white font-inter-bold">Try Again</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <StatusBar hidden />

      <View className="relative h-[30%]">
        <Image
          source={{ uri: data?.foodDetail?.image }}
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

      <View className="overflow-hidden flex-1 bg-white">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 40,
          }}
        >
          <View className="flex-col gap-6 m-4">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="flex-1 text-2xl capitalize font-inter-bold">
                  {data?.foodDetail?.name}
                </Text>
                <Text className="font-inter-bold text-primary">
                  {data?.foodDetail?.category}
                </Text>
              </View>

              <View className="flex-row gap-2 items-center">
                <Star size={15} color="#fad06a" fill="#fad06a" />
                <Text className="font-inter-bold">
                  {data?.foodDetail?.rating}
                </Text>
              </View>
            </View>

            <Text className="text-gray-500 font-inter">
              {data?.foodDetail?.description}
            </Text>

            <Text className="text-2xl font-inter-bold">Choose a size</Text>

            <View className="flex-row gap-3">
              <Pressable
                onPress={() => setSelectedSize("Regular")}
                className={`h-[50px] flex-1 items-center justify-center rounded-full border ${
                  selectedSize === "Regular"
                    ? "border-primary bg-primary/10"
                    : "border-gray-200"
                }`}
              >
                <Text
                  className={`font-inter-bold ${
                    selectedSize === "Regular"
                      ? "text-primary"
                      : "text-gray-700"
                  }`}
                >
                  Regular
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setSelectedSize("Large")}
                className={`h-[50px] flex-1 items-center justify-center rounded-full border ${
                  selectedSize === "Large"
                    ? "border-primary bg-primary/10"
                    : "border-gray-200"
                }`}
              >
                <Text
                  className={`font-inter-bold ${
                    selectedSize === "Large" ? "text-primary" : "text-gray-700"
                  }`}
                >
                  Large
                </Text>
              </Pressable>
            </View>

            <Text className="text-2xl font-inter-bold">Add Extra</Text>

            <View className="overflow-hidden bg-white rounded-3xl border border-gray-100 elevation-sm">
              {data?.foodDetail?.extras.map((data: any, index: any) => {
                const selected = selectedExtras.includes(data.type);
                return (
                  <Pressable
                    key={data.id}
                    onPress={() => {
                      setSelectedExtras((prev) =>
                        prev.includes(data.type)
                          ? prev.filter((item) => item !== data.type)
                          : [...prev, data.type],
                      );
                    }}
                    className={`flex-row items-center justify-between p-6 ${
                      index !== data?.foodDetail?.extra.length - 1
                        ? "border-b border-gray-200"
                        : ""
                    }`}
                  >
                    <View className="flex-row gap-2 items-center">
                      <Text className="font-inter-bold">{data.name}</Text>
                    </View>

                    <View className="flex-row gap-4 items-center">
                      <Text className="text-gray-500 font-inter">
                        ${data.price}
                      </Text>

                      <View
                        className={`justify-center items-center w-7 h-7 rounded-full  ${
                          selected
                            ? "border-primary bg-primary"
                            : "border border-gray-300"
                        }`}
                      >
                        {selected && (
                          <Check size={14} color="white" strokeWidth={3} />
                        )}
                      </View>
                    </View>
                  </Pressable>
                );
              })}
            </View>

            <Text className="text-lg font-inter-bold">
              Special instructions
            </Text>

            <TextArea
              TextInputConfig={{
                autoCorrect: false,
                placeholder: "No pickles, extra napkins...",
                multiline: true,
              }}
            />

            <View className="flex-row gap-4 justify-between items-center">
              <View className="flex-row items-center px-2 h-14 rounded-full bg-primary-light">
                <Pressable className="justify-center items-center w-10 h-10 bg-white rounded-full">
                  <Minus size={17} color="#333" strokeWidth={2.5} />
                </Pressable>

                <Text className="w-10 text-base text-center font-inter-bold">
                  0
                </Text>

                <Pressable className="justify-center items-center w-10 h-10 bg-white rounded-full">
                  <Plus size={17} color="#333" strokeWidth={2.5} />
                </Pressable>
              </View>

              <Pressable className="flex-row flex-1 gap-2 justify-center items-center h-14 rounded-full bg-primary">
                <Text className="text-base text-white font-inter-bold">
                  Add
                </Text>

                <View className="w-1 h-1 rounded-full bg-white/60" />

                <Text className="text-base text-white font-inter">$18.00</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default foodDetail;
