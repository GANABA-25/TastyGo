import type { Request, Response } from "express";
import type { AuthRequest } from "../../middleware/authenticate.ts";
import prisma from "../../lib/prisma.ts";

const getAllRestaurants = async (req: AuthRequest, res: Response) => {
  try {
    const allRestaurants = await prisma.restaurant.findMany();

    console.log(allRestaurants);

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

export default {
  getAllRestaurants,
};
