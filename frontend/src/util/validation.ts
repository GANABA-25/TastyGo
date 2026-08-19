import {
  createAccountTypes,
  loginTypes,
  otpTypes,
  resetPasswordData,
  ResetPasswordEmailType,
} from "../types/authTypes";

export const validateRegisterData = (registerData: createAccountTypes) => {
  const { fullName, email, phoneNumber, password, confirmPassword } =
    registerData;

  const errors = {
    fullName: !fullName.trim() ? "Full name is required" : "",
    email: !email.trim()
      ? "Email is required"
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ? "Email is required and must be valid"
        : "",
    password: !password.trim()
      ? "Password is required"
      : password.length < 7
        ? "Password length should be more than seven characters"
        : !/[A-Z]/.test(password)
          ? "Password must contain at least one uppercase letter"
          : !/[a-z]/.test(password)
            ? "Password must contain at least one lowercase letter"
            : !/[0-9]/.test(password)
              ? "Password must contain at least one number"
              : !/[\W_]/.test(password)
                ? "Password must contain at least one special character"
                : "",

    phoneNumber: !phoneNumber.trim()
      ? "Phone number is required"
      : !/^\d+$/.test(phoneNumber.replace(/\s/g, ""))
        ? "Phone number must contain only numbers"
        : phoneNumber.replace(/\s/g, "").length !== 10
          ? "Phone number must be exactly 10 digits"
          : "",

    confirmPassword: !confirmPassword.trim()
      ? "Confirm password is required"
      : confirmPassword !== password
        ? "Passwords do not match"
        : "",
  };

  return errors;
};

export const validateLoginInData = (signInData: loginTypes) => {
  const { email, password } = signInData;

  const errors = {
    email: !email.trim()
      ? "A valid email is required"
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ? "Incorrect email format"
        : "",

    password: !password.trim() ? "Password is required" : "",
  };

  return errors;
};

export const validateResetPasswordEmail = (
  resetPasswordEmail: ResetPasswordEmailType,
) => {
  const { email } = resetPasswordEmail;

  const errors = {
    email: !email.trim()
      ? "A valid email is required"
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ? "Incorrect email format"
        : "",
  };

  return errors;
};

export const validateOtp = (otpData: otpTypes) => {
  const { otp } = otpData;

  const errors = {
    otp: !otp.trim()
      ? "Verification code is required"
      : !/^\d+$/.test(otp)
        ? "Verification code must contain only numbers"
        : otp.length !== 6
          ? "Verification code must be exactly 6 digits"
          : "",
  };

  return errors;
};

export const validateResetPasswordData = (
  resetPasswordData: resetPasswordData,
) => {
  const { password, confirmPassword } = resetPasswordData;

  const errors = {
    password: !password.trim()
      ? "Password is required"
      : password.length < 7
        ? "Password length should be more than seven characters"
        : !/[A-Z]/.test(password)
          ? "Password must contain at least one uppercase letter"
          : !/[a-z]/.test(password)
            ? "Password must contain at least one lowercase letter"
            : !/[0-9]/.test(password)
              ? "Password must contain at least one number"
              : !/[\W_]/.test(password)
                ? "Password must contain at least one special character"
                : "",

    confirmPassword: !confirmPassword.trim()
      ? "Confirm password is required"
      : confirmPassword !== password
        ? "Passwords do not match"
        : "",
  };

  return errors;
};
