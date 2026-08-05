import { LucideIcon } from "lucide-react-native";
import { Text, TextInput, View } from "react-native";

type InputProps = {
  label: string;
  placeholder: string;
  icon?: LucideIcon;
};

const Input = ({ label, placeholder, icon: Icon }: InputProps) => {
  return (
    <View className="gap-2">
      <Text className="text-gray-500 font-inter">{label}</Text>

      <View className="flex-row items-center border border-gray-200 rounded-lg px-4">
        {Icon && <Icon size={20} color="#9CA3AF" strokeWidth={2} />}

        <TextInput
          className="flex-1 py-4 ml-3"
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
        />
      </View>
    </View>
  );
};

export default Input;
