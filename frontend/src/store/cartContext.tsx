import { createContext, useContext, useState, type ReactNode } from "react";
import { DishTypes } from "../types/dishTypes";

type CartItem = DishTypes & {
  quantity: number;
  totalPrice: number;
};

type AddToCartItem = DishTypes;

type CartContextTypes = {
  cart: CartItem[];
  addToCart: (item: AddToCartItem) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextTypes | undefined>(undefined);

type CartProviderProps = {
  children: ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: AddToCartItem) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (cartItem) => cartItem.id === item.id,
      );

      if (existingItem) {
        return currentCart.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
                totalPrice: Number(cartItem.price) * (cartItem.quantity + 1),
              }
            : cartItem,
        );
      }

      return [
        ...currentCart,
        {
          ...item,
          quantity: 1,
          totalPrice: Number(item.price),
        },
      ];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((currentCart) =>
      currentCart.filter((cartItem) => cartItem.id !== id),
    );
  };

  const increaseQuantity = (id: string) => {
    setCart((currentCart) =>
      currentCart.map((cartItem) =>
        cartItem.id === id
          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
              totalPrice: Number(cartItem.price) * (cartItem.quantity + 1),
            }
          : cartItem,
      ),
    );
  };

  const decreaseQuantity = (id: string) => {
    setCart((currentCart) =>
      currentCart
        .map((cartItem) =>
          cartItem.id === id
            ? {
                ...cartItem,
                quantity: cartItem.quantity - 1,
                totalPrice:
                  Number(cartItem.totalPrice) - Number(cartItem.price),
              }
            : cartItem,
        )
        .filter((cartItem) => cartItem.quantity > 0),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextTypes {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider.");
  }

  return context;
}
