import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "@/src/components/button";
import Input from "@/src/components/Input";
import Ionicons from "@expo/vector-icons/Ionicons";

import { Lock, Mail, UserRound } from "lucide-react-native";

export default function RegisterScreen() {
  return (
    <SafeAreaView className="flex-1 justify-center gap-4 px-8">
      <View className="flex-col gap-4 justify-center items-center">
        <Text className="text-3xl font-inter-bold">Create your account</Text>
        <Text className="text-sm font-inter">
          Two minutes to your first delivery.
        </Text>
      </View>

      <View className="bg-gray-200 rounded-full p-1 self-center">
        <Text className="bg-white px-20 py-3 rounded-full font-inter-bold text-gray-900">
          Sign up
        </Text>
      </View>

      <View className="flex-col gap-4">
        <Input label="Full Name" placeholder="Full Name" icon={UserRound} />

        <Input label="Email" placeholder="Email address" icon={Mail} />

        <Input label="Password" placeholder="Password" icon={Lock} />

        <Input label="Confirm Password" placeholder="Password" icon={Lock} />
      </View>

      <Text className="text-right font-inter-bold text-primary">
        Forget Password?
      </Text>

      <Button label="Create Account" />

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
        <Text className="font-inter">Already have an account?</Text>
        <Pressable onPress={() => router.push("/login")}>
          <Text className="text-primary font-inter-bold">Sign in</Text>
        </Pressable>
      </View>

      <Text className=" font-inter text-gray-500 text-center">
        By continuing you agree to TastyGo's Terms of Service and Privacy
        Policy.
      </Text>
    </SafeAreaView>
  );
}
