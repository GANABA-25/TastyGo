import { AuthProvider } from "./AuthContext";
import { LocationProvider } from "./LocationContext";

export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <LocationProvider>{children}</LocationProvider>
    </AuthProvider>
  );
}
