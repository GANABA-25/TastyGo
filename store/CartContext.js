import { createContext, useState } from "react";

export const CartContext = createContext({
  cartItems: [],
  addToCart: (item) => {},
  removeFromCart: (item) => {},
  removeItemCompletely: (id) => {},
  totalQuantity: 0,
  subtotal: 0,
  totalPrice: 0,
});

const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const subtotal = cartItems.reduce((total, item) => total + item.subtotal, 0);

  const totalPrice =
    cartItems.reduce((total, item) => total + item.subtotal, 0) + 30;

  const addToCart = (item) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find(
        (cartItem) => cartItem.id === item.id
      );

      if (!existingItem) {
        return [
          ...prevCartItems,
          {
            id: item.id,
            image: item.image,
            Category: item.Category,
            name: item.name,
            price: item.price,
            deliveryPrice: 30,
            quantity: 1,
            time: item.time,
            description: item.description,
            item1: item.item1,
            item2: item.item2,
            item3: item.item3,
            subtotal: item.price,
          },
        ];
      } else {
        return prevCartItems.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
                subtotal: cartItem.subtotal + item.price,
                total: cartItem.deliveryPrice + cartItem.subtotal + item.price,
              }
            : cartItem
        );
      }
    });
  };

  const removeFromCart = (item) => {
    setCartItems((prevItems) =>
      prevItems
        .map((prevItem) =>
          prevItem.id === item.id
            ? {
                ...prevItem,
                quantity: prevItem.quantity - 1,
                subtotal: prevItem.subtotal - item.price,
              }
            : prevItem
        )
        .filter((prevItem) => prevItem.quantity > 0)
    );
  };

  const removeItemCompletely = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    removeItemCompletely,
    totalQuantity,
    subtotal,
    totalPrice,
    clearCart: () => {},
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
