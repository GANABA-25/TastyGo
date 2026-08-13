import { LucideIcon } from "lucide-react-native";
import { Text, TextInput, TextInputProps, View } from "react-native";
import FormError from "./formError";

type InputProps = {
  label?: string;
  icon?: LucideIcon;
  type?: string;
  viewPassword?: boolean;
  TextInputConfig: TextInputProps;
  error?: string;
};

const Input = ({
  label,
  icon: Icon,
  type,
  viewPassword,
  TextInputConfig,
  error,
}: InputProps) => {
  return (
    <View className="gap-2">
      {label ? <Text className="text-gray-500 font-inter">{label}</Text> : null}

      <View
        className={` flex-row items-center border ${error ? "border-red-600" : "border-gray-200"} rounded-lg px-4 bg-white`}
      >
        {Icon ? <Icon size={20} color="#9CA3AF" strokeWidth={2} /> : null}

        <TextInput
          className={`flex-1 py-4 font-inter bg-white ${Icon ? "ml-3" : ""}`}
          placeholderTextColor="#9CA3AF"
          secureTextEntry={type === "password" && !viewPassword}
          {...TextInputConfig}
        />
      </View>
      <FormError message={error} />
    </View>
  );
};

export default Input;
