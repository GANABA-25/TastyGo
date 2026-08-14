import { ChevronRight, LucideIcon } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

type settingProps = {
  icon: LucideIcon;
  label: string;
  data?: string;
};

const SettingsCard = ({ icon: Icon, label, data }: settingProps) => {
  return (
    <View className="flex-row justify-between items-center p-4">
      <View className="flex-row items-center gap-2">
        <Pressable className="h-14 w-14 items-center justify-center rounded-full bg-primary-light elevation-sm">
          <Icon size={20} color="#fd6c39" />
        </Pressable>

        <Text className="font-inter-bold">{label}</Text>
      </View>

      <View className="flex-row items-center gap-2">
        <Text className="font-inter text-gray-500">{data}</Text>
        <ChevronRight size={15} />
      </View>
    </View>
  );
};

export default SettingsCard;
