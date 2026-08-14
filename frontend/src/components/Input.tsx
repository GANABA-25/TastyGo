import { LucideIcon } from "lucide-react-native";
import { useState } from "react";
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
  const [isFocused, setIsFocused] = useState(false);

  const { onFocus, onBlur, ...inputProps } = TextInputConfig;

  const borderColor = error
    ? "border-red-600"
    : isFocused
      ? "border-primary"
      : "border-gray-200";

  return (
    <View className="gap-2">
      {label ? <Text className="font-inter text-gray-500">{label}</Text> : null}

      <View
        className={`flex-row items-center rounded-lg border bg-white px-4 ${borderColor}`}
      >
        {Icon ? <Icon size={20} color="#9CA3AF" strokeWidth={2} /> : null}

        <TextInput
          {...inputProps}
          className={`flex-1 bg-white py-4 font-inter ${Icon ? "ml-3" : ""}`}
          placeholderTextColor="#9CA3AF"
          secureTextEntry={type === "password" && !viewPassword}
          onFocus={(event) => {
            setIsFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setIsFocused(false);
            onBlur?.(event);
          }}
        />
      </View>

      <FormError message={error} />
    </View>
  );
};

export default Input;
