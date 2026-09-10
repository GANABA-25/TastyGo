import { Router } from "express";
import { authenticate } from "../../middleware/authenticate.ts";
import cartController from "../cart/cart.controller.ts";

const router = Router();

router.get("/", authenticate, cartController.getCart);
router.post("/addToCart/:dishId", authenticate, cartController.addToCart);
router.delete("/item/:cartItemId", authenticate, cartController.removeCartItem);
router.patch(
  "/increaseItem/:cartItemId",
  authenticate,
  cartController.increaseItemQuantity,
);

router.patch(
  "/decreaseItem/:cartItemId",
  authenticate,
  cartController.decreaseItemQuantity,
);

export default router;
