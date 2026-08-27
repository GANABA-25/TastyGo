import React, { ReactNode } from "react";
import { ActivityIndicator, Pressable, Text } from "react-native";

type ButtonProps = {
  isLoading?: boolean;
  icon?: ReactNode;
  label: string;
  onPress?: () => void;
};

const Button = ({ isLoading = false, icon, label, onPress }: ButtonProps) => {
  const [pressed, setPressed] = React.useState(false);

  return (
    <Pressable
      disabled={isLoading}
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      className={`flex-row items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 ${
        pressed && !isLoading ? "scale-95 opacity-60" : "scale-100 opacity-100"
      } ${isLoading ? "opacity-70" : ""}`}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#FFFFFF" />
      ) : (
        <>
          <Text className="font-inter-bold text-white">{label}</Text>
          {icon}
        </>
      )}
    </Pressable>
  );
};

export default Button;
