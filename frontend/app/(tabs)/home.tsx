import Input from "@/src/components/Input";
import { Menu } from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <View className="bg-primary-light w-full h-1/2 rounded-b-md">
        <View className="flex-row justify-center items-center">
          <Input placeholder="Search dishes, restaurants..." />

          <View className="bg-primary p-4 rounded-full">
            <Menu />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
