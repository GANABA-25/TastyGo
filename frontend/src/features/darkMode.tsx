import { Moon } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

const DarkMode = () => {
  const [toggleDarkMode, setToggleDarkMode] = useState(false);

  const toggleHandler = () => {
    setToggleDarkMode((prev) => !prev);
  };

  return (
    <View className="flex-row justify-between items-center bg-white border border-gray-100 elevation-sm rounded-full p-4">
      <View className="flex-row items-center gap-2">
        <Pressable className="h-14 w-14 items-center justify-center rounded-full bg-primary-light elevation-sm">
          <Moon size={20} color="#fd6c39" />
        </Pressable>

        <Text className="font-inter-bold">Dark mode</Text>
      </View>

      <Pressable
        onPress={toggleHandler}
        className={`h-8 w-14 rounded-full justify-center px-1 ${
          toggleDarkMode ? "bg-primary" : "bg-gray-300"
        }`}
      >
        <View
          className={`h-6 w-6 rounded-full bg-white elevation-sm ${
            toggleDarkMode ? "self-end" : "self-start"
          }`}
        />
      </Pressable>
    </View>
  );
};

export default DarkMode;
