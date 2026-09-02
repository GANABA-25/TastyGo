import { Star } from "lucide-react-native";
import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const RestaurantLoadingCard = () => {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.4, { duration: 800, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [opacity]);

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View className="overflow-hidden relative bg-white rounded-3xl border border-gray-200 elevation-sm">
      <View className="overflow-hidden h-36">
        <Animated.View
          className="w-full h-full bg-gray-200"
          style={pulseStyle}
        />

        <Animated.View
          className="absolute right-0 bottom-0 m-4 w-16 h-7 bg-white rounded-full"
          style={pulseStyle}
        />
      </View>

      <View className="flex-row gap-2 justify-between items-start p-4">
        <View className="flex-1 gap-2">
          <Animated.View
            className="w-36 h-4 bg-gray-200 rounded-md"
            style={pulseStyle}
          />
          <Animated.View
            className="w-52 h-3 bg-gray-200 rounded-md"
            style={pulseStyle}
          />
        </View>

        <View className="flex-row gap-2 items-center">
          <Star size={15} color="#e5e7eb" />
          <Animated.View
            className="w-8 h-4 bg-gray-200 rounded-md"
            style={pulseStyle}
          />
        </View>
      </View>

      <Animated.View
        className="absolute m-4 w-24 h-7 bg-gray-200 rounded-full"
        style={pulseStyle}
      />
    </View>
  );
};

export default RestaurantLoadingCard;
