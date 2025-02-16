import AuthContextProvider from "./AuthContext";
import CartContextProvider from "./CartContext";

const AppContextProvider = ({ children }) => {
  return (
    <AuthContextProvider>
      <CartContextProvider>{children}</CartContextProvider>
    </AuthContextProvider>
  );
};

export default AppContextProvider;
