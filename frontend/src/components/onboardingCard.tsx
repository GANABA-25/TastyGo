import Ionicons from "@expo/vector-icons/Ionicons";
import { Href, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ComponentProps } from "react";
import { Image, Pressable, Text, View } from "react-native";

import Button from "@/src/components/button";
import Logo from "@/src/components/logo";

type onboardingType = {
  imageUri: string;
  iconType: ComponentProps<typeof Ionicons>["name"];
  label: string;
  description: string;
  nextUri: Href;
  step: number;
};

const OnboardingCard = ({
  imageUri,
  iconType,
  label,
  description,
  nextUri,
  step,
}: onboardingType) => {
  return (
    <View className="flex-1 bg-white">
      <StatusBar hidden />

      <View className="relative h-1/2">
        <Image
          source={{ uri: imageUri }}
          className="w-full h-full"
          resizeMode="cover"
        />

        <View className="absolute inset-0 bg-black/30" />

        <View className="absolute top-12 left-8 right-8 flex-row justify-between items-center">
          <Logo />

          <Pressable onPress={() => router.replace("/login")}>
            <Text className="text-white font-inter">Skip</Text>
          </Pressable>
        </View>
      </View>

      <View className="flex-1 justify-between px-8 py-8">
        <View className="w-20 h-20 rounded-full bg-primary-light items-center justify-center">
          <Ionicons name={iconType} size={32} color="#fd6c39" />
        </View>

        <Text className="text-4xl font-inter-bold">{label}</Text>

        <Text className="text-gray-500 font-inter">{description}</Text>

        <View className="flex-row gap-2">
          {[1, 2, 3].map((item) => (
            <View
              key={item}
              className={`w-10 h-2 rounded-full ${
                step === item ? "bg-primary" : "bg-gray-200"
              }`}
            />
          ))}
        </View>

        <Button
          onPress={() => router.replace(nextUri)}
          label="Continue"
          icon={<Ionicons name="arrow-forward" size={20} color="white" />}
        />
      </View>
    </View>
  );
};

export default OnboardingCard;
