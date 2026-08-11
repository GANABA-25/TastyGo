import { foodData } from "@/src/data/dummyData";
import {
  Bell,
  ChevronDown,
  MapPin,
  Search,
  SlidersHorizontal,
} from "lucide-react-native";
import React from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 flex-col gap-4 bg-white" edges={["top"]}>
      <View className="overflow-hidden bg-primary-light rounded-b-[28px] p-4">
        <View className="flex-row items-center justify-between">
          <Pressable className="flex-1">
            <Text className="font-inter text-gray-500">Deliver to</Text>
            <View className="mt-2 flex-row items-center gap-1.5">
              <MapPin size={18} color="#fd6c39" strokeWidth={2.5} />
              <Text className="font-inter-bold text-2xl capitalize">
                Achimota-mile 7
              </Text>
              <ChevronDown size={18} color="#9CA3AF" strokeWidth={2} />
            </View>
          </Pressable>

          <Pressable className="relative">
            <View className="h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm elevation-sm">
              <Bell size={20} color="#111827" strokeWidth={2} />
            </View>
            <View className="absolute right-2.5 top-2 h-2 w-2 rounded-full bg-red-500" />
          </Pressable>
        </View>

        <View className="flex-row items-center gap-3 mt-8">
          <View className="h-12 flex-1 flex-row items-center rounded-full bg-white px-4 shadow-sm elevation-sm">
            <Search size={20} color="#9CA3AF" strokeWidth={2} />
            <TextInput
              className="ml-3 flex-1 font-inter text-base text-gray-900"
              placeholder="Search dishes, restaurants..."
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <Pressable className="h-12 w-12 items-center justify-center rounded-full bg-primary shadow-sm elevation-sm">
            <SlidersHorizontal size={20} color="#fff" strokeWidth={2} />
          </Pressable>
        </View>
      </View>

      <FlatList
        data={foodData}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="flex-row gap-3 px-4 py-2"
        renderItem={({ item }) => (
          <Pressable className="flex-row h-11 items-center justify-center rounded-full border border-gray-200 px-5">
            <item.Icon size={15} color="#fd6c39" strokeWidth={2} />
            <Text className="ml-2 font-inter text-gray-800">{item.name}</Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}
