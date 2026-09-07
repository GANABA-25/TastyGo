import { AuthProvider } from "./AuthContext";
import { LocationProvider } from "./LocationContext";
import { CartProvider } from "./cartContext";

export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <LocationProvider>
        <CartProvider>{children}</CartProvider>
      </LocationProvider>
    </AuthProvider>
  );
}
