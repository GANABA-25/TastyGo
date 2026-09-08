import { useMutation } from "@tanstack/react-query";
import { createContext, useContext, useState, type ReactNode } from "react";
import Toast from "react-native-toast-message";
import { DishTypes } from "../types/dishTypes";
import { addToCartUri } from "../util/https";

type CartItem = {
  id: string;
  foodId: string;
  name: string;
  image: string;
  basePrice: number;
  quantity: number;
  totalPrice: number;

  size?: {
    name: string;
    price: number;
  };

  extras: {
    id: string;
    name: string;
    price: number;
  }[];

  specialInstructions?: string;
};

type Cart = {
  items: CartItem[];
  subTotal: number;
  deliveryFee: number;
  total: number;
};

type AddToCartItem = DishTypes;

type CartContextTypes = {
  cart: Cart;
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
  const [cart, setCart] = useState<Cart>({
    items: [],
    subTotal: 0,
    deliveryFee: 0,
    total: 0,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: addToCartUri,

    onSuccess: (data) => {},
  });

  const addToCart = (item: AddToCartItem) => {
    let alreadyInCart = false;

    setCart((currentCart) => {
      const existingItem = currentCart.items.find(
        (cartItem) => cartItem.id === item.id,
      );

      if (existingItem) {
        alreadyInCart = true;

        const items = currentCart.items.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
                totalPrice: cartItem.basePrice * (cartItem.quantity + 1),
              }
            : cartItem,
        );

        const subTotal = items.reduce(
          (total, item) => total + item.totalPrice,
          0,
        );

        return {
          ...currentCart,
          items,
          subTotal,
          total: subTotal + currentCart.deliveryFee,
        };
      }

      const newItem: CartItem = {
        id: item.id,
        foodId: item.id,
        name: item.name,
        image: item.image,
        basePrice: Number(item.price),
        quantity: 1,
        totalPrice: Number(item.price),
        extras: [],
      };

      const items = [...currentCart.items, newItem];

      const subTotal = items.reduce(
        (total, item) => total + item.totalPrice,
        0,
      );

      return {
        ...currentCart,
        items,
        subTotal,
        total: subTotal + currentCart.deliveryFee,
      };
    });

    mutate(item.id);

    Toast.show({
      type: "success",
      text1: alreadyInCart
        ? `${item.name} quantity increased`
        : `${item.name} added to cart`,
    });
  };

  const removeFromCart = (id: string) => {
    setCart((currentCart) => {
      const items = currentCart.items.filter((cartItem) => cartItem.id !== id);

      const subTotal = items.reduce(
        (total, item) => total + item.totalPrice,
        0,
      );

      return {
        ...currentCart,
        items,
        subTotal,
        total: subTotal + currentCart.deliveryFee,
      };
    });
  };

  const increaseQuantity = (id: string) => {
    setCart((currentCart) => {
      const items = currentCart.items.map((cartItem) =>
        cartItem.id === id
          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
              totalPrice: cartItem.basePrice * (cartItem.quantity + 1),
            }
          : cartItem,
      );

      const subTotal = items.reduce(
        (total, item) => total + item.totalPrice,
        0,
      );

      return {
        ...currentCart,
        items,
        subTotal,
        total: subTotal + currentCart.deliveryFee,
      };
    });
  };

  const decreaseQuantity = (id: string) => {
    setCart((currentCart) => {
      const items = currentCart.items
        .map((cartItem) =>
          cartItem.id === id
            ? {
                ...cartItem,
                quantity: cartItem.quantity - 1,
                totalPrice: cartItem.basePrice * (cartItem.quantity - 1),
              }
            : cartItem,
        )
        .filter((cartItem) => cartItem.quantity > 0);

      const subTotal = items.reduce(
        (total, item) => total + item.totalPrice,
        0,
      );

      return {
        ...currentCart,
        items,
        subTotal,
        total: subTotal + currentCart.deliveryFee,
      };
    });
  };

  const clearCart = () => {
    setCart({
      items: [],
      subTotal: 0,
      deliveryFee: 0,
      total: 0,
    });
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
