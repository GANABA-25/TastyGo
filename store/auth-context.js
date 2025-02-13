import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
  isOnboardingComplete: false,
  OnboardingComplete: (OnboardingToken) => {},
});

const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState();
  const [OnboardingToken, setOnboardingToken] = useState();

  const authenticate = (token) => {
    setAuthToken(token);
    AsyncStorage.setItem("token", token);
  };

  const logout = async (token) => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("onboardingComplete");
      setAuthToken(null);
      setOnboardingToken(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const OnboardingComplete = (OnboardingToken) => {
    setOnboardingToken(OnboardingToken);
    AsyncStorage.setItem("onboardingComplete", OnboardingToken);
  };

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
    isOnboardingComplete: !!OnboardingToken,
    OnboardingComplete: OnboardingComplete,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
