import { useMutation } from "@tanstack/react-query";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import Toast from "react-native-toast-message";
import { useFetch } from "../hooks/useFetch";
import { DishTypes } from "../types/dishTypes";
import {
  addToCartUri,
  decreaseQuantityUri,
  getCart,
  increaseQuantityUri,
  removeFromCartUri,
} from "../util/https";

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
  removeFromCart: (cartItemId: string) => void;
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

  const { data, isLoading, isRefetching, isError, refetch } = useFetch({
    queryKey: ["cart"],
    queryFn: getCart,
    errorMessage: "Failed to load restaurants.",
  });

  useEffect(() => {
    if (data) {
      setCart(data.cart);
    }
  }, [data]);

  const { mutate, isPending } = useMutation({
    mutationFn: addToCartUri,

    onSuccess: (data: any) => {
      // console.log("ADD TO CART RESPONSE:", JSON.stringify(data, null, 2));
      setCart(data.cart);
      Toast.show({
        type: "success",
        text1: data.wasAlreadyInCart
          ? `${data.itemName} quantity increased`
          : `${data.itemName} added to cart`,
      });
    },

    onError: (error) => {
      console.log("checking error", error);
      Toast.show({ type: "error", text1: "Couldn't add item to cart" });
    },
  });

  const { mutate: removeFromCartMutation, isPending: isRemovingFromCart } =
    useMutation({
      mutationFn: removeFromCartUri,

      onSuccess: (data: any) => {
        setCart(data.cart);

        Toast.show({
          type: "success",
          text1: `${data.itemName} removed from cart`,
        });
      },

      onError: (error) => {
        console.log("Remove from cart error:", error);

        Toast.show({
          type: "error",
          text1: "Couldn't remove item from cart",
        });
      },
    });

  const { mutate: increaseQuantityMutation, isPending: isIncreaseQuantity } =
    useMutation({
      mutationFn: increaseQuantityUri,

      onSuccess: (data: any) => {
        setCart(data.cart);

        Toast.show({
          type: "success",
          text1: "Item quantity increased",
        });
      },

      onError: (error) => {
        console.log("Increase quantity error:", error);

        Toast.show({
          type: "error",
          text1: "Couldn't increase item quantity",
        });
      },
    });

  const { mutate: decreaseQuantityMutation, isPending: isDecreaseQuantity } =
    useMutation({
      mutationFn: decreaseQuantityUri,

      onSuccess: (data: any) => {
        setCart(data.cart);

        Toast.show({
          type: "success",
          text1: "Item quantity decreased",
        });
      },

      onError: (error) => {
        console.log("Decrease quantity error:", error);

        Toast.show({
          type: "error",
          text1: "Couldn't Decrease item quantity",
        });
      },
    });

  const addToCart = (item: AddToCartItem) => {
    mutate(item.id);
  };

  const removeFromCart = (cartItemId: string) => {
    removeFromCartMutation(cartItemId);
  };

  const increaseQuantity = (id: string) => {
    increaseQuantityMutation(id);
  };

  const decreaseQuantity = (id: string) => {
    decreaseQuantityMutation(id);
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
