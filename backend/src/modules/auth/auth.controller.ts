import "dotenv/config";
import type { Request, Response } from "express";
import prisma from "../../lib/prisma.ts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../services/email.services.ts";
import { welcomeEmailTemplate } from "../../templates/welcomeEmail.ts";
import {
  generatePhoneOtp,
  verifyPhoneOtp,
} from "../../services/arkesel.service.ts";

const register = async (req: Request, res: Response) => {
  try {
    const { fullName, email, phoneNumber, password } = req.body;

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

    const normalizedPhoneNumber = phoneNumber
      .replace(/\D/g, "")
      .replace(/^0/, "+233");

    await prisma.user.create({
      data: {
        fullName,
        email,
        phoneNumber: normalizedPhoneNumber,
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

const resetPasswordEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(200).json({
        message:
          "If an account exists with this email, a verification code has been sent.",
      });
    }

    await prisma.passwordResetRequest.updateMany({
      where: {
        userId: user.id,
        otpVerified: false,
        usedAt: null,
      },
      data: {
        expiresAt: new Date(),
      },
    });

    const resetRequest = await prisma.passwordResetRequest.create({
      data: {
        userId: user.id,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      },
    });

    const otpResponse = await generatePhoneOtp(user.phoneNumber);

    if (otpResponse.code !== "1000") {
      await prisma.passwordResetRequest.delete({
        where: {
          id: resetRequest.id,
        },
      });

      return res.status(500).json({
        message:
          "We couldn't send the verification code. Please try again later.",
      });
    }

    return res.status(200).json({
      message:
        "If an account exists with this email, a verification code has been sent.",
      resetData: {
        email: user.email,
        resetRequestId: resetRequest.id,
      },
    });
  } catch (error) {
    console.error("Password reset request error:", error);

    return res.status(500).json({
      message:
        "An error occurred while processing your request. Please try again later.",
    });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { otp, resetRequestId } = req.body;

    const resetRequest = await prisma.passwordResetRequest.findUnique({
      where: {
        id: resetRequestId,
      },
      include: {
        user: true,
      },
    });

    if (!resetRequest) {
      return res.status(400).json({
        message: "Invalid or expired password reset request.",
      });
    }

    if (resetRequest.expiresAt < new Date()) {
      return res.status(400).json({
        message:
          "This verification code has expired. Please request a new one.",
      });
    }

    if (resetRequest.otpVerified) {
      return res.status(400).json({
        message: "This verification code has already been verified.",
      });
    }

    const result = await verifyPhoneOtp(otp, resetRequest.user.phoneNumber);

    if (result.code === "1101") {
      return res.status(400).json({
        message: "The code field is required.",
      });
    }

    if (result.code === "1106") {
      return res.status(400).json({
        message: "Internal error",
      });
    }

    await prisma.passwordResetRequest.update({
      where: {
        id: resetRequest.id,
      },
      data: {
        otpVerified: true,
      },
    });

    return res.status(200).json({
      message: "OTP verified successfully.",
      resetRequestId: resetRequest.id,
    });
  } catch (error) {
    console.error("OTP verification error:", error);

    return res.status(500).json({
      message:
        "An error occurred while verifying the OTP. Please try again later.",
    });
  }
};

export const passwordReset = async (req: Request, res: Response) => {
  try {
    const { password, resetRequestId } = req.body;

    const resetRequest = await prisma.passwordResetRequest.findUnique({
      where: {
        id: resetRequestId,
      },
    });

    if (!resetRequest) {
      return res.status(400).json({
        message: "Invalid password reset request.",
      });
    }

    if (resetRequest.expiresAt < new Date()) {
      return res.status(400).json({
        message:
          "This password reset request has expired. Please request a new code.",
      });
    }

    if (!resetRequest.otpVerified) {
      return res.status(403).json({
        message: "Please verify the OTP before resetting your password.",
      });
    }

    if (resetRequest.usedAt) {
      return res.status(400).json({
        message: "This password reset request has already been used.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.update({
      where: {
        id: resetRequest.userId,
      },
      data: {
        password: hashedPassword,
      },
    });

    await prisma.passwordResetRequest.update({
      where: {
        id: resetRequest.id,
      },
      data: {
        usedAt: new Date(),
      },
    });

    return res.status(200).json({
      message: "Password reset successfully. You can now sign in.",
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
  register,
  login,
  resetPasswordEmail,
  verifyOtp,
  passwordReset,
};
