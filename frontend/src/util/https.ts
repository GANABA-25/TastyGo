import {
  createAccountTypes,
  loginTypes,
  otpTypes,
  ResetPasswordEmailType,
  ResetPasswordRequest,
} from "../types/authTypes";
import { DishTypes } from "../types/dishTypes";
import { api } from "./app";

export const register = async (data: createAccountTypes) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const login = async (data: loginTypes) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/auth/logOut");
  return response.data;
};

export const resetPasswordEmail = async (data: ResetPasswordEmailType) => {
  const response = await api.post("/auth/password-reset/verify-email", data);
  return response.data;
};

export const verifyOtp = async (data: otpTypes) => {
  const response = await api.post("/auth/password-reset/verify-otp", data);
  return response.data;
};

export const resetPassword = async (data: ResetPasswordRequest) => {
  const response = await api.post("/auth/password-reset", data);
  return response.data;
};

export const getAllRestaurants = async () => {
  const response = await api.get("/restaurants/getAllRestaurants");
  return response.data;
};

export const getFoodDetail = async (id: string) => {
  const response = await api.get(`/restaurants/getFoodDetail/${id}`);

  return response.data;
};

export const getRestaurantData = async (id: string) => {
  const response = await api.get(`/restaurants/getRestaurantData/${id}`);

  return response.data;
};

export const addToCartUri = async (dish: DishTypes) => {
  const response = await api.post("/cart/addToCart", dish);
  return response.data;
};
