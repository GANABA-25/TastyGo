import Button from "@/src/components/button";
import Input from "@/src/components/Input";
import { resetPasswordData } from "@/src/types/authTypes";
import { resetPassword } from "@/src/util/https";
import { validateResetPasswordData } from "@/src/util/validation";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { Lock } from "lucide-react-native";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

type ResetPasswordErrorResponse = {
  message: string;
  errors?: Partial<Record<keyof resetPasswordData, string>>;
};

const ResetPassword = () => {
  const { resetRequestId } = useLocalSearchParams<{
    resetRequestId: string;
  }>();
  const [serverErrors, setServerErrors] = useState<
    Partial<Record<keyof resetPasswordData, string>>
  >({});

  const [formData, setFormData] = useState<resetPasswordData>({
    password: "",
    confirmPassword: "",
  });

  const [didEdit, setDidEdit] = useState<
    Record<keyof resetPasswordData, boolean>
  >({
    password: false,
    confirmPassword: false,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: resetPassword,

    onSuccess: (data) => {
      Toast.show({
        type: "success",
        text1: data.message,
      });

      router.push("/login");
    },

    onError: (error) => {
      const axiosError = error as AxiosError<ResetPasswordErrorResponse>;

      const responseData = axiosError.response?.data;

      if (responseData?.errors) {
        setServerErrors(responseData.errors);
      }

      Toast.show({
        type: "error",
        text1: responseData?.message || "Something went wrong",
      });
    },
  });

  const validationErrors = validateResetPasswordData(formData);

  const getFieldError = (field: keyof resetPasswordData) => {
    if (didEdit[field]) {
      return validationErrors[field];
    }

    return serverErrors[field];
  };

  const inputChangeHandler = (
    inputIdentifier: keyof resetPasswordData,
    value: string,
  ) => {
    setFormData((prev) => ({
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

  const inputBlurHandler = (identifier: keyof resetPasswordData) => {
    setDidEdit((prev) => ({
      ...prev,
      [identifier]: true,
    }));
  };

  const ResetPasswordHandler = () => {
    setDidEdit({
      password: true,
      confirmPassword: true,
    });

    const errors = validateResetPasswordData(formData);

    if (Object.values(errors).some((error) => error !== "")) {
      return;
    }

    console.log(resetRequestId);

    mutate({ ...formData, resetRequestId });
  };
  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={20}
      >
        <ScrollView
          contentContainerClassName="flex-grow justify-center gap-4 px-4"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 gap-4 px-4">
            <View className="flex-col gap-2 justify-center items-center">
              <Text className="font-inter-bold text-3xl capitalize">
                New password
              </Text>
              <Text className="font-inter text-gray-500">
                Choose a password you haven't used before.
              </Text>
            </View>

            <View className="gap-4">
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
                  value: formData.password,
                }}
              />

              <Input
                label="Confirm Password"
                type="password"
                icon={Lock}
                error={getFieldError("confirmPassword")}
                TextInputConfig={{
                  autoCorrect: false,
                  placeholder: "confirm Password",
                  onChangeText: (text) =>
                    inputChangeHandler("confirmPassword", text),
                  onBlur: () => inputBlurHandler("confirmPassword"),
                  value: formData.confirmPassword,
                }}
              />

              <Button
                onPress={ResetPasswordHandler}
                label="Update Password"
                isLoading={isPending}
              />

              <View className="flex-row justify-center items-center gap-2">
                <Text className="font-inter">Remembered it?</Text>
                <Pressable onPress={() => router.push("/login")}>
                  <Text className="text-primary font-inter-bold">Sign in</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ResetPassword;
