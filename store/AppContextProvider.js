import AuthContextProvider from "./AuthContext";
import CartContextProvider from "./CartContext";
import LocationContextProvider from "./locationContext";

const AppContextProvider = ({ children }) => {
  return (
    <AuthContextProvider>
      <CartContextProvider>
        <LocationContextProvider>{children}</LocationContextProvider>
      </CartContextProvider>
    </AuthContextProvider>
  );
};

export default AppContextProvider;
