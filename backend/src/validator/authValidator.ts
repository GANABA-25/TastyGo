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

  body("phoneNumber")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .bail()
    .custom((value) => {
      const phoneNumber = value.replace(/\s/g, "");

      if (!/^\d{10}$/.test(phoneNumber)) {
        throw new Error("Phone number must be exactly 10 digits");
      }

      if (!phoneNumber.startsWith("0")) {
        throw new Error("Phone number must start with 0");
      }

      return true;
    }),

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

export const verifyOtpValidator = [
  body("otp")
    .trim()
    .notEmpty()
    .withMessage("OTP is required")
    .isLength({ min: 6, max: 6 })
    .withMessage("OTP must be 6 digits")
    .isNumeric()
    .withMessage("OTP must contain only numbers"),
];
