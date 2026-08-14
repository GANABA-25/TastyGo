import { register } from "@/src/util/https";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import Button from "@/src/components/button";
import Input from "@/src/components/Input";
import Ionicons from "@expo/vector-icons/Ionicons";

import { createAccountTypes } from "@/src/types/authTypes";
import { validateRegisterData } from "@/src/util/validation";

import { Lock, Mail, UserRound } from "lucide-react-native";

type RegisterErrorResponse = {
  message: string;
  errors?: Partial<Record<keyof createAccountTypes, string>>;
};

export default function RegisterScreen() {
  const [serverErrors, setServerErrors] = useState<
    Partial<Record<keyof createAccountTypes, string>>
  >({});

  const [registerData, setRegisterData] = useState<createAccountTypes>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [didEdit, setDidEdit] = useState<
    Record<keyof createAccountTypes, boolean>
  >({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: register,

    onSuccess: (data) => {
      Toast.show({
        type: "success",
        text1: data.message,
      });

      router.push("/login");
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

  const validationErrors = validateRegisterData(registerData);

  const getFieldError = (field: keyof createAccountTypes) => {
    if (didEdit[field]) {
      return validationErrors[field];
    }

    return serverErrors[field];
  };

  const inputChangeHandler = (
    inputIdentifier: keyof createAccountTypes,
    value: string,
  ) => {
    setRegisterData((prev) => ({
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

  const inputBlurHandler = (identifier: keyof createAccountTypes) => {
    setDidEdit((prev) => ({
      ...prev,
      [identifier]: true,
    }));
  };

  const RegisterHandler = () => {
    setDidEdit({
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    const errors = validateRegisterData(registerData);

    if (Object.values(errors).some((error) => error !== "")) {
      return;
    }

    mutate(registerData);
  };
  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        className="flex-1 justify-center gap-4 px-8"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={20}
      >
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
          <Input
            label="Full Name"
            icon={UserRound}
            error={getFieldError("fullName")}
            TextInputConfig={{
              autoCorrect: false,
              placeholder: "Full Name",
              onChangeText: (text) => inputChangeHandler("fullName", text),
              onBlur: () => inputBlurHandler("fullName"),
              value: registerData.fullName,
            }}
          />

          <Input
            label="Email"
            icon={Mail}
            error={getFieldError("email")}
            TextInputConfig={{
              autoCorrect: false,
              placeholder: "Email address",
              onChangeText: (text) => inputChangeHandler("email", text),
              onBlur: () => inputBlurHandler("email"),
              value: registerData.email,
            }}
          />

          <Input
            label="Password"
            icon={Lock}
            error={getFieldError("password")}
            TextInputConfig={{
              autoCorrect: false,
              placeholder: "Password",
              onChangeText: (text) => inputChangeHandler("password", text),
              onBlur: () => inputBlurHandler("password"),
              value: registerData.password,
            }}
          />

          <Input
            label="Confirm Password"
            icon={Lock}
            error={getFieldError("confirmPassword")}
            TextInputConfig={{
              autoCorrect: false,
              placeholder: "confirm Password",
              onChangeText: (text) =>
                inputChangeHandler("confirmPassword", text),
              onBlur: () => inputBlurHandler("confirmPassword"),
              value: registerData.confirmPassword,
            }}
          />
        </View>

        <Text className="text-right font-inter-bold text-primary">
          Forget Password?
        </Text>

        <Button
          label="Create Account"
          onPress={RegisterHandler}
          isLoading={isPending}
        />

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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
