import { Text, View } from "react-native";

const Logo = () => {
  return (
    <View className="flex-row justify-between items-center gap-2 bg-white rounded-full p-1 pr-4 z-10">
      <View className="bg-primary p-2 rounded-full w-10 h-10 justify-center items-center">
        <Text className="text-white font-bold">Q</Text>
      </View>
      <Text className="font-inter-bold">TastyGo</Text>
    </View>
  );
};

export default Logo;
