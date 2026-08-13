import { Text } from "react-native";

interface formErrorTypes {
  message: string | undefined;
  className?: string;
}

export default function FormError({ message, className = "" }: formErrorTypes) {
  if (!message) return null;

  return <Text className={`text-red-600 ${className}`}>{message}</Text>;
}
