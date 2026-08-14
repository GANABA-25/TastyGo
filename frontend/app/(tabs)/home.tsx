import FoodCard from "@/src/components/foodCard";
import RestaurantsCard from "@/src/components/restaurantsCard";
import { categories, restaurants } from "@/src/data/dummyData";
import { LinearGradient } from "expo-linear-gradient";
import {
  Bell,
  ChevronDown,
  MapPin,
  Search,
  SlidersHorizontal,
} from "lucide-react-native";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-primary-light" edges={["top"]}>
      <View className="flex-1 bg-white">
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
              <View className="h-11 w-11 items-center justify-center rounded-full bg-white elevation-sm">
                <Bell size={20} color="#111827" strokeWidth={2} />
              </View>

              <View className="absolute right-2.5 top-2 h-2 w-2 rounded-full bg-red-500" />
            </Pressable>
          </View>

          <View className="flex-row items-center gap-3 mt-8">
            <View className="h-12 flex-1 flex-row items-center rounded-full bg-white px-4 elevation-sm">
              <Search size={20} color="#9CA3AF" strokeWidth={2} />

              <TextInput
                className="ml-3 flex-1 font-inter text-base text-gray-900"
                placeholder="Search dishes, restaurants..."
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <Pressable className="h-12 w-12 items-center justify-center rounded-full bg-primary elevation-sm">
              <SlidersHorizontal size={20} color="#fff" strokeWidth={2} />
            </Pressable>
          </View>
        </View>

        <FlatList
          data={restaurants}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          contentContainerClassName="gap-4 px-4 pb-8 pt-4"
          ListHeaderComponent={
            <View className="gap-4">
              <FlatList
                data={categories}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => String(item.id)}
                contentContainerClassName="flex-row gap-3 py-2"
                renderItem={({ item }) => (
                  <Pressable className="flex-row h-11 items-center justify-center rounded-full border border-gray-200 bg-white px-5 elevation-sm">
                    <Text>{item.emoji}</Text>

                    <Text className="ml-2 font-inter-bold text-gray-800">
                      {item.label}
                    </Text>
                  </Pressable>
                )}
              />

              <View className="relative overflow-hidden rounded-3xl elevation-sm">
                <LinearGradient
                  colors={["#fe872f", "#FF6B35"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="gap-2 p-4"
                >
                  <Text className="font-inter uppercase text-white/80">
                    Tonight only
                  </Text>

                  <Text className="font-inter-bold text-3xl text-white">
                    15% off your first order
                  </Text>

                  <Text className="font-inter text-white/80">
                    Use code QUICK15 at checkout
                  </Text>
                </LinearGradient>

                <View className="absolute left-[23rem] bottom-12 bg-white/10 w-[7rem] h-[7rem] rounded-full" />

                <View className="absolute right-[5rem] top-20 bg-white/10 w-[7rem] h-[7rem] rounded-full" />
              </View>

              <View className="gap-4">
                <View className="flex-row justify-between items-center">
                  <Text className="font-inter-bold">Popular right now</Text>

                  <Text className="font-inter-bold text-primary">See all</Text>
                </View>

                <FoodCard />
              </View>

              <View className="flex-1 gap-4">
                <Text className="font-inter-bold">Featured restaurants</Text>
              </View>
            </View>
          }
          renderItem={({ item }) => <RestaurantsCard item={item} />}
        />
      </View>
    </SafeAreaView>
  );
}
