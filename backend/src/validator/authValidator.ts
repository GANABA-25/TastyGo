import { body } from "express-validator";

export const registerValidator = [
  body("fullName").trim().notEmpty().withMessage("fullName is required"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("A valid email is required")
    .bail()
    .isEmail()
    .withMessage("Incorrect email format"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .bail()
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .bail()
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .bail()
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .bail()
    .matches(/[\W_]/)
    .withMessage("Password must contain at least one special character"),

  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("Confirm password is required")
    .bail()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
];

export const logInValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Incorrect email format"),

  body("password").trim().notEmpty().withMessage("Password is required"),
];
