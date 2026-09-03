import { Router } from "express";
import adminController from "../admin/admin.controller.ts";

const router = Router();

router.post("/postRestaurants", adminController.postRestaurants);

export default router;
