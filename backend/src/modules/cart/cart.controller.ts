import type { Request, Response } from "express";
import type { AuthRequest } from "../../middleware/authenticate.ts";
import prisma from "../../lib/prisma.ts";

const getCart = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const cart = await prisma.cart.findUnique({
      where: {
        userId,
      },
      include: {
        items: {
          include: {
            food: {
              select: {
                name: true,
                image: true,
                price: true,
              },
            },
          },
        },
      },
    });

    if (!cart) {
      return res.status(200).json({
        cart: {
          items: [],
          subTotal: 0,
          deliveryFee: 0,
          total: 0,
        },
      });
    }

    const cartItems = cart.items.map((item: any) => ({
      id: item.id,
      name: item.food.name,
      image: item.food.image,
      quantity: item.quantity,
      totalPrice: Number(item.food.price) * item.quantity,
    }));

    const subTotal = cartItems.reduce(
      (total: number, item: any) => total + item.totalPrice,
      0,
    );

    const deliveryFee = 10;

    const total = subTotal + deliveryFee;

    return res.status(200).json({
      cart: {
        items: cartItems,
        subTotal,
        deliveryFee,
        total,
      },
    });
  } catch (error) {
    console.error("Get cart error:", error);

    return res.status(500).json({
      message:
        "An error occurred while processing your request. Please try again later.",
    });
  }
};

const addToCart = async (req: AuthRequest, res: Response) => {
  try {
    const { dishId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // Check if food exists
    const dish = await prisma.food.findUnique({
      where: {
        id: dishId,
      },
    });

    if (!dish) {
      return res.status(404).json({
        message: "Food not found",
      });
    }

    // Find user's cart
    let cart = await prisma.cart.findUnique({
      where: {
        userId,
      },
    });

    // Create cart if it doesn't exist
    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId,
        },
      });
    }

    // Check if food is already in cart
    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        foodId: dish.id,
      },
    });

    // Increase quantity or create item
    if (existingCartItem) {
      await prisma.cartItem.update({
        where: {
          id: existingCartItem.id,
        },
        data: {
          quantity: {
            increment: 1,
          },
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          foodId: dish.id,
          quantity: 1,
        },
      });
    }

    // Get updated cart with only the food fields we need
    const updatedCart = await prisma.cart.findUnique({
      where: {
        id: cart.id,
      },
      include: {
        items: {
          include: {
            food: {
              select: {
                name: true,
                image: true,
                price: true,
              },
            },
          },
        },
      },
    });

    // Format cart items for frontend
    const cartItems =
      updatedCart?.items.map((item: any) => ({
        id: item.id,
        name: item.food.name,
        image: item.food.image,
        quantity: item.quantity,
        totalPrice: Number(item.food.price) * item.quantity,
      })) ?? [];

    // Calculate totals
    const subTotal = cartItems.reduce(
      (total: number, item: any) => total + item.totalPrice,
      0,
    );

    const deliveryFee = 0;
    const total = subTotal + deliveryFee;

    return res.status(200).json({
      message: existingCartItem
        ? "Food quantity increased"
        : "Food added to cart",

      wasAlreadyInCart: !!existingCartItem,

      itemName: dish.name,

      cart: {
        items: cartItems,
        subTotal,
        deliveryFee,
        total,
      },
    });
  } catch (error) {
    console.error("Add to cart error:", error);

    return res.status(500).json({
      message:
        "An error occurred while processing your request. Please try again later.",
    });
  }
};

const updateCartItem = (req: AuthRequest, res: Response) => {
  try {
  } catch (error) {
    console.error("Create restaurant error:", error);

    return res.status(500).json({
      message:
        "An error occurred while processing your request. Please try again later.",
    });
  }
};

const removeCartItem = (req: AuthRequest, res: Response) => {
  try {
  } catch (error) {
    console.error("Create restaurant error:", error);

    return res.status(500).json({
      message:
        "An error occurred while processing your request. Please try again later.",
    });
  }
};

const clearCart = (req: AuthRequest, res: Response) => {
  try {
  } catch (error) {
    console.error("Create restaurant error:", error);

    return res.status(500).json({
      message:
        "An error occurred while processing your request. Please try again later.",
    });
  }
};

export default {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};
