import type { Request, Response } from "express";
import type { AuthRequest } from "../../middleware/authenticate.ts";
import prisma from "../../lib/prisma.ts";

const postRestaurants = async (req: AuthRequest, res: Response) => {
  try {
    const { restaurant } = req.body;

    if (!restaurant) {
      return res.status(400).json({
        message: "Restaurant data is required.",
      });
    }

    const {
      name,
      tags = [],
      rating,
      eta,
      distance,
      deliveryFee = 0,
      image,
      featured = false,
      popular = false,
      promo,
      reviews = [],
      foods = [],
    } = restaurant;

    if (!name) {
      return res.status(400).json({
        message: "Restaurant name is required.",
      });
    }

    if (!Array.isArray(tags)) {
      return res.status(400).json({
        message: "Tags must be an array.",
      });
    }

    if (!Array.isArray(reviews)) {
      return res.status(400).json({
        message: "Reviews must be an array.",
      });
    }

    if (!Array.isArray(foods)) {
      return res.status(400).json({
        message: "Foods must be an array.",
      });
    }

    const createdRestaurant = await prisma.restaurant.create({
      data: {
        name,
        tags,
        rating,
        eta,
        distance,
        deliveryFee,
        image,
        featured,
        popular,
        promo,

        reviews: {
          create: reviews.map((review: any) => ({
            name: review.name,
            rating: review.rating,
            text: review.text,
          })),
        },

        foods: {
          create: foods.map((food: any) => ({
            name: food.name,
            description: food.description,
            image: food.image,
            rating: food.rating,
            price: food.price,
            category: food.category,
            popular: food.popular ?? false,

            extras: {
              create: (food.extras ?? []).map((extra: any) => ({
                name: extra.name,
                price: extra.price,
              })),
            },

            reviews: {
              create: (food.reviews ?? []).map((review: any) => ({
                name: review.name,
                rating: review.rating,
                text: review.text,
              })),
            },
          })),
        },
      },

      include: {
        reviews: true,

        foods: {
          include: {
            extras: true,
            reviews: true,
          },
        },
      },
    });

    return res.status(201).json({
      message: "Restaurant created successfully.",
      restaurant: createdRestaurant,
    });
  } catch (error) {
    console.error("Create restaurant error:", error);

    return res.status(500).json({
      message:
        "An error occurred while processing your request. Please try again later.",
    });
  }
};

export default {
  postRestaurants,
};
