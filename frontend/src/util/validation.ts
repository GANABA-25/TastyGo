import { loginTypes } from "../types/authTypes";

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
