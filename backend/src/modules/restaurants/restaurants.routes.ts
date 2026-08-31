import { Router } from "express";
import { authenticate } from "../../middleware/authenticate.ts";
import restaurantController from "./restaurants.controller.ts";

const router = Router();

router.get(
  "/getAllRestaurants",
  authenticate,
  restaurantController.getAllRestaurants,
);

router.get(
  "/getFoodDetail/:id",
  authenticate,
  restaurantController.getFoodDetail,
);

export default router;
