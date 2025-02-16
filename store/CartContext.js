import { createContext, useState } from "react";

export const CartContext = createContext({
  cartItems: [],
  addToCart: (item) => {},
  removeFromCart: (id) => {},
  removeAllFromCart: (id) => {},
  clearCart: () => {},
});

const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeFromCart = () => {};
  const removeAllFromCart = () => {};

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    removeAllFromCart,
    clearCart: () => {},
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
