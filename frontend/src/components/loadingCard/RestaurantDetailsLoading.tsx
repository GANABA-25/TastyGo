import { ScrollView, View } from "react-native";

const RestaurantDetailsLoading = () => {
  return (
    <View className="flex-1 bg-white">
      <View className="relative h-[30%] bg-gray-200">
        <View className="absolute top-5 left-5 justify-center items-center w-11 h-11 bg-gray-300 rounded-full" />

        <View className="absolute top-5 right-5 justify-center items-center w-11 h-11 bg-gray-300 rounded-full" />
      </View>

      <View className="flex-1 p-4 bg-white">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 40,
          }}
        >
          <View className="flex-col gap-6">
            <View className="flex-row justify-between items-start">
              <View className="gap-2">
                <View className="w-48 h-8 bg-gray-200 rounded-md" />
                <View className="w-32 h-4 bg-gray-200 rounded-md" />
              </View>

              <View className="flex-row gap-2 items-center">
                <View className="w-5 h-5 bg-gray-200 rounded-full" />
                <View className="w-8 h-4 bg-gray-200 rounded-md" />
              </View>
            </View>

            <View className="flex-row gap-3">
              <View className="flex-1 h-24 bg-gray-200 rounded-2xl" />
              <View className="flex-1 h-24 bg-gray-200 rounded-2xl" />
              <View className="flex-1 h-24 bg-gray-200 rounded-2xl" />
            </View>

            <View className="flex-row gap-3">
              <View className="w-24 h-12 bg-gray-200 rounded-full" />
              <View className="w-20 h-12 bg-gray-200 rounded-full" />
              <View className="w-20 h-12 bg-gray-200 rounded-full" />
            </View>

            <View className="flex-row gap-4 p-4 bg-white rounded-2xl border border-gray-100">
              <View className="w-24 h-24 bg-gray-200 rounded-2xl" />

              <View className="flex-1 gap-2">
                <View className="w-40 h-6 bg-gray-200 rounded-md" />
                <View className="w-full h-4 bg-gray-200 rounded-md" />
                <View className="w-3/4 h-4 bg-gray-200 rounded-md" />

                <View className="flex-row justify-between items-center mt-2">
                  <View className="w-16 h-5 bg-gray-200 rounded-md" />
                  <View className="w-10 h-10 bg-gray-200 rounded-full" />
                </View>
              </View>
            </View>

            <View className="gap-4">
              <View className="w-24 h-7 bg-gray-200 rounded-md" />
              <View className="h-32 bg-gray-200 rounded-2xl" />
              <View className="h-32 bg-gray-200 rounded-2xl" />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default RestaurantDetailsLoading;
