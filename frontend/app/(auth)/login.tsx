import { useAuth } from "@/src/store/AuthContext";
import { AxiosError } from "axios";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "@/src/components/button";
import Input from "@/src/components/Input";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Lock, Mail } from "lucide-react-native";

import { loginTypes } from "@/src/types/authTypes";
import { login } from "@/src/util/https";
import { validateLoginInData } from "@/src/util/validation";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

type RegisterErrorResponse = {
  message: string;
  errors?: Partial<Record<keyof loginTypes, string>>;
};

export default function LoginScreen() {
  const { authenticate } = useAuth();
  const [serverErrors, setServerErrors] = useState<
    Partial<Record<keyof loginTypes, string>>
  >({});

  const [loginData, setLoginData] = useState<loginTypes>({
    email: "",
    password: "",
  });

  const [didEdit, setDidEdit] = useState<Record<keyof loginTypes, boolean>>({
    email: false,
    password: false,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      authenticate(data);
      router.replace("/home");
    },

    onError: (error) => {
      const axiosError = error as AxiosError<RegisterErrorResponse>;

      const responseData = axiosError.response?.data;

      if (responseData?.errors) {
        setServerErrors(responseData.errors);
      }

      Toast.show({
        type: "error",
        text1: responseData?.message || "Something went wrong",
      });

      console.log("Backend error:", responseData);
    },
  });

  const validationErrors = validateLoginInData(loginData);

  const getFieldError = (field: keyof loginTypes) => {
    if (didEdit[field]) {
      return validationErrors[field];
    }

    return serverErrors[field];
  };

  const inputChangeHandler = (
    inputIdentifier: keyof loginTypes,
    value: string,
  ) => {
    setLoginData((prev) => ({
      ...prev,
      [inputIdentifier]: value,
    }));

    setDidEdit((prev) => ({
      ...prev,
      [inputIdentifier]: false,
    }));

    setServerErrors((prev) => ({
      ...prev,
      [inputIdentifier]: "",
    }));
  };

  const inputBlurHandler = (identifier: keyof loginTypes) => {
    setDidEdit((prev) => ({
      ...prev,
      [identifier]: true,
    }));
  };

  const loginHandler = () => {
    setDidEdit({
      email: true,
      password: true,
    });

    const errors = validateLoginInData(loginData);

    if (Object.values(errors).some((error) => error !== "")) {
      return;
    }

    mutate(loginData);
  };

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        className="flex-1 justify-center gap-8 px-8"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
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

        <Input
          label="Email"
          icon={Mail}
          error={getFieldError("email")}
          TextInputConfig={{
            autoCorrect: false,
            placeholder: "Email address",
            onChangeText: (text) => inputChangeHandler("email", text),
            onBlur: () => inputBlurHandler("email"),
            value: loginData.email,
          }}
        />

        <Input
          label="Password"
          type="password"
          icon={Lock}
          error={getFieldError("password")}
          TextInputConfig={{
            autoCorrect: false,
            placeholder: "Enter password",
            onChangeText: (text) => inputChangeHandler("password", text),
            onBlur: () => inputBlurHandler("password"),
            value: loginData.password,
          }}
        />

        <Pressable onPress={() => router.push("/reset-password-email")}>
          <Text className="text-right font-inter-bold text-primary">
            Forget Password?
          </Text>
        </Pressable>

        <Button onPress={loginHandler} label="Sign in" isLoading={isPending} />

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
          <Pressable onPress={() => router.replace("/register")}>
            <Text className="text-primary font-inter-bold">Create Account</Text>
          </Pressable>
        </View>

        <Text className=" font-inter text-gray-500 text-center">
          By continuing you agree to TastyGo's Terms of Service and Privacy
          Policy.
        </Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
