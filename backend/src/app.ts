import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import AuthRoutes from "./modules/auth/auth.routes.ts";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", AuthRoutes);

const PORT = process.env.PORT || 8090;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
