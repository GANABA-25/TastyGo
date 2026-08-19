import Input from "@/src/components/Input";
import Button from "@/src/components/button";
import { ResetPasswordEmailType } from "@/src/types/authTypes";
import { resetPasswordEmail } from "@/src/util/https";
import { validateResetPasswordEmail } from "@/src/util/validation";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { router } from "expo-router";
import { Mail } from "lucide-react-native";
import { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

type ResetEmailResponse = {
  message: string;
  errors?: Partial<Record<keyof ResetPasswordEmailType, string>>;
};

const ResetPasswordEmail = () => {
  const [serverErrors, setServerErrors] = useState<
    Partial<Record<keyof ResetPasswordEmailType, string>>
  >({});

  const [formData, setFormData] = useState<ResetPasswordEmailType>({
    email: "",
  });

  const [didEdit, setDidEdit] = useState<
    Record<keyof ResetPasswordEmailType, boolean>
  >({
    email: false,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: resetPasswordEmail,

    onSuccess: (data) => {
      router.push({
        pathname: "/otp-verification",
        params: {
          email: data.resetData.email,
          resetRequestId: data.resetData.resetRequestId,
        },
      });
    },

    onError: (error) => {
      const axiosError = error as AxiosError<ResetEmailResponse>;

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

  const validationErrors = validateResetPasswordEmail(formData);

  const getFieldError = (field: keyof ResetPasswordEmailType) => {
    if (didEdit[field]) {
      return validationErrors[field];
    }

    return serverErrors[field];
  };

  const inputChangeHandler = (
    inputIdentifier: keyof ResetPasswordEmailType,
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

  const inputBlurHandler = (identifier: keyof ResetPasswordEmailType) => {
    setDidEdit((prev) => ({
      ...prev,
      [identifier]: true,
    }));
  };

  const handleSubmit = () => {
    setDidEdit({
      email: true,
    });

    const errors = validateResetPasswordEmail(formData);

    if (Object.values(errors).some((error) => error !== "")) {
      return;
    }

    mutate(formData);
  };
  return (
    <SafeAreaView className="flex-1 mt-32 px-4">
      <View className="w-full items-center gap-4">
        <Text className="text-center font-inter-bold text-3xl">
          Enter Email
        </Text>

        <Text className="max-w-[350px] text-center font-inter">
          Confirm your account email and we'll text you a one-time code to your
          phone number.
        </Text>
      </View>

      <View className="w-full max-w-[400px] gap-4">
        <Input
          label="Email"
          icon={Mail}
          error={getFieldError("email")}
          TextInputConfig={{
            autoCorrect: false,
            keyboardType: "email-address",
            autoCapitalize: "none",
            placeholder: "Email address",
            onChangeText: (text) => inputChangeHandler("email", text),
            onBlur: () => inputBlurHandler("email"),
            value: formData.email,
          }}
        />

        <Button onPress={handleSubmit} label="Continue" isLoading={isPending} />
      </View>

      <Text className="mt-6 text-center font-inter">
        Remembered it? Sign in
      </Text>
    </SafeAreaView>
  );
};

export default ResetPasswordEmail;
