import type { Request, Response } from "express";
import type { AuthRequest } from "../../middleware/authenticate.ts";
import prisma from "../../lib/prisma.ts";

const getAllRestaurants = async (req: AuthRequest, res: Response) => {
  try {
    const allRestaurants = await prisma.restaurant.findMany();

    return res.status(200).json({
      restaurants: allRestaurants,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      message:
        "An error occurred while processing your request. Please try again later.",
    });
  }
};

const getFoodDetail = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const foodDetail = await prisma.food.findUnique({
      where: {
        id,
      },
    });
    console.log(foodDetail);

    if (!foodDetail) {
      return res.status(404).json({
        message: "Food Details not found!",
      });
    }

    return res.status(200).json({
      message: "Food details fetched successfully",
      foodDetail,
    });
  } catch (error) {
    console.error("Get food detail error:", error);

    return res.status(500).json({
      message:
        "An error occurred while processing your request. Please try again later.",
    });
  }
};

export default {
  getAllRestaurants,
  getFoodDetail,
};
