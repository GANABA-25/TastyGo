import type { Request, Response } from "express";
import type { AuthRequest } from "../../middleware/authenticate.ts";
import prisma from "../../lib/prisma.ts";

const getCart = (req: AuthRequest, res: Response) => {
  try {
    console.log("came here --------");
  } catch (error) {
    console.error("Create restaurant error:", error);

    return res.status(500).json({
      message:
        "An error occurred while processing your request. Please try again later.",
    });
  }
};

const addToCart = (req: AuthRequest, res: Response) => {
  try {
    console.log("came here --------");
  } catch (error) {
    console.error("Create restaurant error:", error);

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
