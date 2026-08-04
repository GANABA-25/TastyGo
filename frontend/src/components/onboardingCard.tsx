import Ionicons from "@expo/vector-icons/Ionicons";
import { Href, router } from "expo-router";
import { ComponentProps } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
    <SafeAreaView className="flex-1">
      <View className="flex-1 gap-12 relative">
        <Image
          source={{
            uri: imageUri,
          }}
          className="w-full h-1/2"
          resizeMode="cover"
        />

        <View className="absolute top-8 left-8 right-8 flex-row justify-between items-center z-10">
          <Logo />
          <Pressable onPress={() => router.replace("/login")}>
            <Text className="text-white font-inter">Skip</Text>
          </Pressable>
        </View>

        <View className="bg-black/30 absolute w-full h-1/2" />

        <View className="flex-1 justify-between mb-5 max-w-2xl mx-auto px-8">
          <View className="w-20 h-20 rounded-full bg-primary-light items-center justify-center elevation-sm">
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
    </SafeAreaView>
  );
};

export default OnboardingCard;
