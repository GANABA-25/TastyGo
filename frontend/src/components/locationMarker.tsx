import { useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";
import { Marker } from "react-native-maps";

const LocationMarker = ({
  coordinates,
}: {
  coordinates: { latitude: number; longitude: number };
}) => {
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 1800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [pulseAnim]);

  const ringScale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2.8],
  });

  const ringOpacity = pulseAnim.interpolate({
    inputRange: [0, 0.7, 1],
    outputRange: [0.35, 0.1, 0],
  });

  return (
    <Marker
      coordinate={coordinates}
      title="Your location"
      anchor={{ x: 0.5, y: 0.5 }}
      tracksViewChanges={false}
    >
      <View
        className="items-center justify-center"
        style={{ width: 60, height: 60 }}
      >
        {/* Pulsing ring */}
        <Animated.View
          className="absolute rounded-full bg-primary"
          style={{
            width: 24,
            height: 24,
            opacity: ringOpacity,
            transform: [{ scale: ringScale }],
          }}
        />

        {/* Solid dot */}
        <View
          className="h-6 w-6 items-center justify-center rounded-full border-[3px] border-white bg-primary"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
          }}
        />
      </View>
    </Marker>
  );
};

export default LocationMarker;
