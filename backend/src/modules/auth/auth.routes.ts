import { Router } from "express";
import {
  registerValidator,
  logInValidator,
} from "../../validator/authValidator.ts";
import { validateRequest } from "../../middleware/vlidateRequest.ts";
import authController from "./auth.controller.ts";

const router = Router();

router.post(
  "/register",
  registerValidator,
  validateRequest,
  authController.register,
);

router.post("/login", logInValidator, validateRequest, authController.login);

export default router;
