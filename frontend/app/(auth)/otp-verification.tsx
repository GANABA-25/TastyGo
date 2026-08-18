import Button from "@/src/components/button";
import FormError from "@/src/components/formError";
import { useCountdown } from "@/src/hooks/useCountdown";
import { OtpVerificationData } from "@/src/types/authTypes";
import { resetPasswordEmail, verifyOtp } from "@/src/util/https";
import { validateOtp } from "@/src/util/validation";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import {
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const OTP_LENGTH = 6;

type VerifyOtpResponse = {
  message: string;
  errors?: Partial<Record<keyof OtpVerificationData, string>>;
};

type resetDataProps = {
  email: string;
  resetRequestId: string;
};

const OtpVerification = () => {
  const { timeLeft, formattedTime, isExpired, reset } = useCountdown(5 * 60);
  const { email, resetRequestId } = useLocalSearchParams<{
    email: string;
    resetRequestId: string;
  }>();
  const [formData, setFormData] = useState<OtpVerificationData>({
    otp: "",
  });

  const [serverErrors, setServerErrors] = useState<
    Partial<Record<keyof OtpVerificationData, string>>
  >({});

  const [didEdit, setDidEdit] = useState<
    Record<keyof OtpVerificationData, boolean>
  >({
    otp: false,
  });

  const [otpDigits, setOtpDigits] = useState<string[]>(
    Array(OTP_LENGTH).fill(""),
  );

  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const inputRefs = useRef<Array<TextInput | null>>([]);

  const { mutate, isPending } = useMutation({
    mutationFn: verifyOtp,

    onSuccess: (data) => {
      console.log("OTP verification successful:", data);
      // router.replace("/reset-password");
    },

    onError: (error) => {
      const axiosError = error as AxiosError<VerifyOtpResponse>;

      const responseData = axiosError.response?.data;

      if (responseData?.errors) {
        setServerErrors(responseData.errors);
      }

      Toast.show({
        type: "error",
        text1: responseData?.message || "Something went wrong",
      });

      console.log("OTP verification error:", responseData);
    },
  });

  const { mutate: resendOtp, isPending: isResending } = useMutation({
    mutationFn: resetPasswordEmail,

    onSuccess: (data) => {
      reset();

      setOtpDigits(Array(OTP_LENGTH).fill(""));

      setFormData({
        otp: "",
      });

      setDidEdit({
        otp: false,
      });

      setServerErrors({});

      Toast.show({
        type: "success",
        text1: "OTP sent",
        text2: "A new verification code has been sent to your phone.",
      });
    },

    onError: (error) => {
      const axiosError = error as AxiosError<VerifyOtpResponse>;

      const responseData = axiosError.response?.data;

      Toast.show({
        type: "error",
        text1: responseData?.message || "Unable to resend OTP",
      });

      console.log("Resend OTP error:", responseData);
    },
  });

  const validationErrors = validateOtp(formData);

  const getFieldError = (
    field: keyof OtpVerificationData,
  ): string | undefined => {
    if (didEdit[field]) {
      return validationErrors[field];
    }

    return serverErrors[field];
  };

  const handleOtpChange = (value: string, index: number) => {
    const digit = value.replace(/\D/g, "").slice(-1);

    const updatedOtp = [...otpDigits];
    updatedOtp[index] = digit;

    setOtpDigits(updatedOtp);

    setFormData({
      otp: updatedOtp.join(""),
    });

    // Clear errors when the user starts correcting the OTP
    setDidEdit((previousState) => ({
      ...previousState,
      otp: false,
    }));

    setServerErrors((previousErrors) => ({
      ...previousErrors,
      otp: "",
    }));

    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpBlur = () => {
    setDidEdit({
      otp: true,
    });

    setFocusedIndex(null);
  };

  const handleKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (
      event.nativeEvent.key === "Backspace" &&
      !otpDigits[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    setDidEdit({
      otp: true,
    });

    const errors = validateOtp(formData);

    const hasValidationErrors = Object.values(errors).some(
      (error) => error !== "",
    );

    if (hasValidationErrors) {
      return;
    }

    mutate({
      otp: formData.otp,
      email,
      resetRequestId,
    });
  };

  const handleResendOtp = () => {
    if (!isExpired || isResending) {
      return;
    }

    if (!email) {
      Toast.show({
        type: "error",
        text1: "Unable to resend OTP",
        text2: "Your email address is missing.",
      });

      return;
    }

    resendOtp({
      email,
    });
  };

  const otpError = getFieldError("otp");

  return (
    <SafeAreaView className="mt-32 flex-1 gap-4 px-4">
      <View className="w-full items-center gap-4">
        <Text className="text-center font-inter-bold text-3xl">
          Enter the code
        </Text>

        <Text className="max-w-[350px] text-center font-inter">
          We sent a 6-digit code to your phone number.
        </Text>
      </View>

      <View className="items-center gap-4">
        <View className="flex-row justify-center gap-3">
          {otpDigits.map((digit, index) => {
            const borderColor = otpError
              ? "border-red-600"
              : focusedIndex === index
                ? "border-primary"
                : "border-gray-300";

            return (
              <TextInput
                key={index}
                ref={(ref) => {
                  inputRefs.current[index] = ref;
                }}
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                onKeyPress={(event) => handleKeyPress(event, index)}
                onFocus={() => setFocusedIndex(index)}
                onBlur={handleOtpBlur}
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
                textAlign="center"
                className={`h-14 w-12 rounded-xl border ${borderColor} font-inter-bold text-xl`}
              />
            );
          })}
        </View>

        <FormError message={otpError} />
      </View>

      <Button onPress={handleSubmit} label="Verify" isLoading={isPending} />

      <View className="items-center">
        <Text className="font-inter text-gray-500">
          Didn't receive the code?{" "}
          {!isExpired ? (
            <Text className="font-inter-bold text-gray-400">
              Resend in {formattedTime}
            </Text>
          ) : isResending ? (
            <Text className="font-inter-bold text-gray-400">Sending...</Text>
          ) : (
            <Text
              onPress={handleResendOtp}
              className="font-inter-bold text-primary"
            >
              Resend OTP
            </Text>
          )}
        </Text>
      </View>

      <View className="items-center gap-2">
        {!isExpired ? (
          <Text className="font-inter text-gray-500">
            Code expires in{" "}
            <Text className="font-inter-bold text-primary">
              {formattedTime}
            </Text>
          </Text>
        ) : (
          <Text className="font-inter-bold text-red-600">
            Your verification code has expired.
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default OtpVerification;
