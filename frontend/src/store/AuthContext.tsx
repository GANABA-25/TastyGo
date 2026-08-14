import { AxiosError } from "axios";
import { useRouter } from "expo-router";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { SignInResponse } from "../types/authTypes";
import { logout as logoutRequest } from "../util/https";

type AuthContextTypes = {
  userData: SignInResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  authenticate: (user: SignInResponse) => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextTypes | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();

  const [userData, setUserData] = useState<SignInResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        // const user = await getCurrentUser();
        // setUserData(user);
      } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response?.status !== 401) {
          console.error("Failed to load user:", error);
        }

        setUserData(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const authenticate = useCallback((user: SignInResponse) => {
    setUserData(user);
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
    } catch (error) {
      console.error("Logout failed:", error);
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
