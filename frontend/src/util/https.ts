import { createAccountTypes, loginTypes } from "../types/authTypes";
import { api } from "./app";

export const createAccount = async (data: createAccountTypes) => {
  const response = await api.post("/auth/createAccount", data);
  return response.data;
};

export const login = async (data: loginTypes) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};
