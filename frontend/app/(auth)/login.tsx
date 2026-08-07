import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "@/src/components/button";
import Input from "@/src/components/Input";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Lock, Mail } from "lucide-react-native";

export default function LoginScreen() {
  return (
    <SafeAreaView className="flex-1 justify-center gap-8 px-8">
      <View className="flex-col gap-4 justify-center items-center">
        <Text className="text-3xl font-inter-bold">Welcome back</Text>
        <Text className="text-sm font-inter">
          Sign in to pick up where you left off.
        </Text>
      </View>

      <View className="bg-gray-200 rounded-full p-1 self-center">
        <Text className="bg-white px-20 py-3 rounded-full font-inter-bold text-gray-900">
          Sign in
        </Text>
      </View>

      <Input label="Email" placeholder="Email address" icon={Mail} />

      <Input label="Password" placeholder="Password" icon={Lock} />

      <Text className="text-right font-inter-bold text-primary">
        Forget Password?
      </Text>

      <Button onPress={() => router.replace("/home")} label="Sign in" />

      <View className="flex-row justify-center items-center gap-4">
        <View className="bg-gray-200 w-1/4 h-1" />
        <Text className="font-inter">or continue with </Text>
        <View className="bg-gray-200 w-1/4 h-1" />
      </View>

      <View className="flex-row justify-center items-center gap-4 border p-4 border-gray-200 rounded-full bg-white elevation-sm">
        <Ionicons name="logo-google" size={24} color="black" />
        <Text className=" font-inter-bold">Google</Text>
      </View>

      <View className="flex-row justify-center items-center gap-2">
        <Text className="font-inter">Don't have an account?</Text>
        <Pressable onPress={() => router.push("/register")}>
          <Text className="text-primary font-inter-bold">Create Account</Text>
        </Pressable>
      </View>

      <Text className=" font-inter text-gray-500 text-center">
        By continuing you agree to TastyGo's Terms of Service and Privacy
        Policy.
      </Text>
    </SafeAreaView>
  );
}
