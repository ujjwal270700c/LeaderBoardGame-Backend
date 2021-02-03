const { check, validationResult } = require("express-validator");

exports.validateSignupRequest = [
  check("Name").notEmpty().withMessage("Name is required"),
  check("Age").notEmpty().withMessage("Age is required"),
  check("Email_id").isEmail().withMessage("Valid Email is required"),
  check("PhoneNumber").notEmpty().withMessage("contact no is required"),
  check("Location").notEmpty().withMessage("Location  is required"),

  check("Password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 6 character long"),
];

exports.validateSigninRequest = [
  check("PhoneNumber").isEmail().withMessage("Valid PhoneNumber is required"),
  check("Password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 6 character long"),
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};