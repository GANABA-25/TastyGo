import { Router } from "express";
import { authenticate } from "../../middleware/authenticate.ts";
import cartController from "../cart/cart.controller.ts";
const router = Router();

router.get("/", authenticate, cartController.getCart);
router.post("/addToCart/:dishId", authenticate, cartController.addToCart);
router.patch("/items/:id", authenticate, cartController.updateCartItem);
router.delete("/items/:id", authenticate, cartController.removeCartItem);
router.delete("/", authenticate, cartController.clearCart);

export default router;
