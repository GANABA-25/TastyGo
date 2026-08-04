import React, { ReactNode } from "react";
import { Pressable, Text } from "react-native";

type ButtonProps = {
  icon?: ReactNode;
  label: string;
  onPress?: () => void;
};

const Button = ({ icon, label, onPress }: ButtonProps) => {
  const [pressed, setPressed] = React.useState(false);
  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      className={`flex-row items-center justify-center gap-2 bg-primary rounded-full px-6 py-4 ${
        pressed ? "opacity-60 scale-95" : "opacity-100 scale-100"
      }`}
    >
      <Text className="text-white font-inter-bold">{label}</Text>
      {icon}
    </Pressable>
  );
};

export default Button;
