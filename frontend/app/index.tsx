import { useAuth } from "@/src/store/AuthContext";
import { Redirect } from "expo-router";

export default function Index() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Redirect href="/home" />;
  }

  return <Redirect href="/best-kitchen" />;
}
