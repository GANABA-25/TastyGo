import { ScrollView, View } from "react-native";

const FoodDetailSkeleton = () => {
  return (
    <View className="flex-1">
      <View className="relative h-[30%] bg-gray-200">
        <View className="absolute top-5 left-5 w-11 h-11 bg-gray-300 rounded-full" />
        <View className="absolute top-5 right-5 w-11 h-11 bg-gray-300 rounded-full" />
      </View>

      <View className="overflow-hidden flex-1 bg-white">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 40,
          }}
        >
          <View className="flex-col gap-6 m-4">
            <View className="flex-row justify-between items-start">
              <View className="flex-1 gap-2">
                <View className="w-48 h-8 bg-gray-200 rounded-lg" />
                <View className="w-24 h-5 bg-gray-200 rounded-md" />
              </View>

              <View className="flex-row gap-2 items-center">
                <View className="w-4 h-4 bg-gray-200 rounded-full" />
                <View className="w-8 h-5 bg-gray-200 rounded-md" />
              </View>
            </View>

            <View className="gap-2">
              <View className="w-full h-4 bg-gray-200 rounded-md" />
              <View className="w-11/12 h-4 bg-gray-200 rounded-md" />
              <View className="w-3/4 h-4 bg-gray-200 rounded-md" />
            </View>

            <View className="w-40 h-7 bg-gray-200 rounded-md" />

            <View className="flex-row gap-3">
              <View className="flex-1 h-[50px] bg-gray-200 rounded-full" />
              <View className="flex-1 h-[50px] bg-gray-200 rounded-full" />
            </View>

            <View className="w-32 h-7 bg-gray-200 rounded-md" />

            <View className="overflow-hidden bg-white rounded-3xl border border-gray-100">
              <View className="flex-row justify-between items-center p-6">
                <View className="w-28 h-5 bg-gray-200 rounded-md" />
                <View className="w-20 h-5 bg-gray-200 rounded-md" />
              </View>

              <View className="border-b border-gray-200" />

              <View className="flex-row justify-between items-center p-6">
                <View className="w-32 h-5 bg-gray-200 rounded-md" />
                <View className="w-20 h-5 bg-gray-200 rounded-md" />
              </View>

              <View className="border-b border-gray-200" />

              <View className="flex-row justify-between items-center p-6">
                <View className="w-24 h-5 bg-gray-200 rounded-md" />
                <View className="w-20 h-5 bg-gray-200 rounded-md" />
              </View>
            </View>

            <View className="w-44 h-6 bg-gray-200 rounded-md" />

            <View className="w-full h-28 bg-gray-200 rounded-2xl" />

            <View className="flex-row gap-4 justify-between items-center">
              <View className="w-36 h-14 bg-gray-200 rounded-full" />
              <View className="flex-1 h-14 bg-gray-200 rounded-full" />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default FoodDetailSkeleton;
