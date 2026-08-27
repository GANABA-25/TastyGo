import axios from "axios";

type GenerateOtpResponse = {
  code: string;
  message: string;
  ussd_code?: string;
};

type VerifyOtpResponse = {
  code: string;
  message: string;
};

const ARKESEL_API_KEY = process.env.ARKESEL_API_KEY;

const ARKESEL_OTP_URL =
  process.env.ARKESEL_OTP_URL ?? "https://sms.arkesel.com/api/otp/generate";

const ARKESEL_OTP_VERIFY_URL =
  process.env.ARKESEL_OTP_VERIFY_URL ??
  "https://sms.arkesel.com/api/otp/verify";

const ARKESEL_SENDER_ID = process.env.ARKESEL_SENDER_ID ?? "Arkesel";

export const generatePhoneOtp = async (
  phoneNumber: string,
): Promise<GenerateOtpResponse> => {
  if (!ARKESEL_API_KEY) {
    throw new Error("ARKESEL_API_KEY is not configured");
  }

  const response = await axios.post<GenerateOtpResponse>(
    ARKESEL_OTP_URL,
    {
      expiry: 5,
      length: 6,
      medium: "sms",
      message:
        "TastyGo Password Reset: Your verification code is %otp_code%. This code expires in 5 minutes. Do not share this code with anyone.",
      number: phoneNumber,
      sender_id: ARKESEL_SENDER_ID,
      type: "numeric",
    },
    {
      headers: {
        "api-key": ARKESEL_API_KEY,
        "Content-Type": "application/json",
      },
      timeout: 10_000,
    },
  );

  return response.data;
};

export const verifyPhoneOtp = async (
  otp: string,
  phoneNumber: string,
): Promise<VerifyOtpResponse> => {
  if (!ARKESEL_API_KEY) {
    throw new Error("ARKESEL_API_KEY is not configured");
  }

  const response = await axios.post<VerifyOtpResponse>(
    ARKESEL_OTP_VERIFY_URL,
    {
      api_key: ARKESEL_API_KEY,
      code: otp,
      number: phoneNumber,
    },
    {
      headers: {
        "api-key": ARKESEL_API_KEY,
        "Content-Type": "application/json",
      },
      timeout: 10_000,
    },
  );

  return response.data;
};
