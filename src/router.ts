import { Router } from "express";
import { body } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
} from "./handlers/product";
import {
  createUpdate,
  deleteUpdate,
  getAllUpdate,
  updateUpdate,
} from "./handlers/update";
import { handleInputErrors } from "./modules/middleware";

const router = Router();

/**
 * Products
 */

router.get("/product", getProducts);
router.get("/product/:id", getProductById);
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  (req, res) => {}
);
router.post(
  "/product",
  body("name").isString(),
  handleInputErrors,
  createProduct
);
router.delete("/product/:id", deleteProduct);

/**
 * Update
 */

router.get("/update", getAllUpdate);
router.get("/update/:id", getProductById);
router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATE"]).optional(),
  body("version").optional(),
  handleInputErrors,
  updateUpdate
);
router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  body("productId").exists().isString(),
  handleInputErrors,
  createUpdate
);
router.delete("/update/:id", deleteUpdate);

/**
 * Update point
 */

router.get("/update-point", () => {});
router.get("/update-point/:id", () => {});
router.put(
  "/update-point/:id",
  body("name").optional(),
  body("description").optional(),
  () => {}
);
router.post(
  "/update-point",
  body("name").exists().isString(),
  body("description").exists().isString(),
  body("updateID").exists().isString(),
  handleInputErrors,
  () => {}
);
router.delete("/update-point/:id", () => {});

export default router;
