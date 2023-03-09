import { validationResult } from "express-validator";
import { MiddlewareFn } from "../types";

export const handleInputErrors: MiddlewareFn = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400);
    res.json({ errors: errors.array() });
  } else {
    next();
  }
};
