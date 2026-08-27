import { Href, router } from "expo-router";
import { ChevronRight, LucideIcon } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

type settingProps = {
  icon: LucideIcon;
  label: string;
  data?: string;
  route: Href;
};

const SettingsCard = ({ icon: Icon, label, data, route }: settingProps) => {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      onPress={() => router.push(route)}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      className={`flex-row justify-between items-center p-4 ${
        pressed ? "scale-95 opacity-60" : "scale-100 opacity-100"
      }`}
    >
      <View className="flex-row items-center gap-2">
        <View className="h-14 w-14 items-center justify-center rounded-full bg-primary-light elevation-sm">
          <Icon size={20} color="#fd6c39" />
        </View>

        <Text className="font-inter-bold">{label}</Text>
      </View>

      <View className="flex-row items-center gap-2">
        <Text className="font-inter text-gray-500">{data}</Text>
        <ChevronRight size={15} />
      </View>
    </Pressable>
  );
};

export default SettingsCard;
