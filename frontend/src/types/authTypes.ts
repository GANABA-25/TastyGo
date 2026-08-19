export type createAccountTypes = {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
};

export type loginTypes = {
  email: string;
  password: string;
};

export type user = {
  id: string;
  fullName: string;
  email: string;
};

export type SignInResponse = {
  message: "Sign in successful.";
  token: string;
  user: user;
};

export type ResetPasswordEmailType = {
  email: string;
};

export type otpTypes = {
  otp: string;
  email?: string;
  resetRequestId?: string;
};

export type OtpVerificationData = {
  otp: string;
};

export type resetPasswordData = {
  password: string;
  confirmPassword: string;
};

export type ResetPasswordRequest = {
  password: string;
  confirmPassword: string;
  resetRequestId: string;
};
