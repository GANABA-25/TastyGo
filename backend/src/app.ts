import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import AuthRoutes from "./modules/auth/auth.routes.ts";
import RestaurantRoutes from "./modules/restaurants/restaurants.routes.ts";
import adminRoutes from "./modules/admin/admin.routes.ts";
import cartRoutes from "./modules/cart/cart.routes.ts";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", AuthRoutes);
app.use("/restaurants", RestaurantRoutes);
app.use("/admin", adminRoutes);
app.use("/cart", cartRoutes);

const PORT = process.env.PORT || 8090;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
