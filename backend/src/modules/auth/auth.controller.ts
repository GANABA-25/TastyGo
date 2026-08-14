import "dotenv/config";
import type { Request, Response } from "express";
import prisma from "../../lib/prisma.ts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../services/email.services.ts";
import { welcomeEmailTemplate } from "../../templates/welcomeEmail.ts";

const register = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Account already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
      },
    });

    await sendEmail({
      to: email,
      subject: "Welcome",
      html: welcomeEmailTemplate(fullName),
    });

    return res.status(201).json({
      message: "Account created.",
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      message:
        "An error occurred while processing your request. Please try again later.",
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      },
    );

    return res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message:
        "An error occurred while processing your request. Please try again later.",
    });
  }
};

export default {
  register,
  login,
};
