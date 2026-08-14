import { createAccountTypes, loginTypes } from "../types/authTypes";
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
