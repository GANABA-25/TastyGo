import { createAccountTypes, loginTypes } from "../types/authTypes";

export const validateRegisterData = (registerData: createAccountTypes) => {
  const { fullName, email, password, confirmPassword } = registerData;

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
