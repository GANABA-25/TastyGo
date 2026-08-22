import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const foodDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <SafeAreaView className="flex-1">
      <View>
        <Text>foodDeatils</Text>
      </View>
    </SafeAreaView>
  );
};

export default foodDetail;
