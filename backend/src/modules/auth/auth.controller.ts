import type { Request, Response } from "express";

const register = (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message:
        "An error occurred while processing your request. Please try again later.",
    });
  }
};

const login = (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.error(error);
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
