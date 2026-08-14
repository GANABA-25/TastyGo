import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { SignInResponse, user } from "../types/authTypes";

const ACCESS_TOKEN_KEY = "accessToken";
const USER_DATA_KEY = "userData";

type AuthContextTypes = {
  userData: user | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  authenticate: (response: SignInResponse) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextTypes | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();

  const [userData, setUserData] = useState<user | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await SecureStore.getItemAsync("accessToken");
        const storedUser = await SecureStore.getItemAsync("userData");

        if (token && storedUser) {
          const parsedUser: user = JSON.parse(storedUser);

          setUserData(parsedUser);
        } else {
          setUserData(null);
        }
      } catch (error) {
        console.error("Failed to restore authentication:", error);

        await SecureStore.deleteItemAsync("accessToken");
        await SecureStore.deleteItemAsync("userData");

        setUserData(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const authenticate = useCallback(async (response: SignInResponse) => {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, response.token);

    await SecureStore.setItemAsync(
      USER_DATA_KEY,
      JSON.stringify(response.user),
    );

    setUserData(response.user);
  }, []);

  const logout = useCallback(async () => {
    try {
      await Promise.all([
        SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY),
        SecureStore.deleteItemAsync(USER_DATA_KEY),
      ]);
    } catch (error) {
      console.error("Failed to clear stored authentication:", error);
    } finally {
      setUserData(null);
      router.replace("/login");
    }
  }, [router]);

  const value = useMemo<AuthContextTypes>(
    () => ({
      userData,
      isAuthenticated: Boolean(userData),
      isLoading,
      authenticate,
      logout,
    }),
    [userData, isLoading, authenticate, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextTypes {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}
