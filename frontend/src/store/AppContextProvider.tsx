import { AuthProvider } from "./AuthContext";

export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
