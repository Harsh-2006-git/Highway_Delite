// routes/promoRoutes.js
import express from "express";
import {
  createPromoCode,
  getAllPromoCodes,
  validatePromoCode,
  getPromoCodeById,
  updatePromoCode,
  deletePromoCode,
} from "../controller/promoController.js";

const router = express.Router();

// POST /api/promo - Create new promo code
router.post("/create", createPromoCode);

// GET /api/promo - Get all promo codes
router.get("/get-all", getAllPromoCodes);

// POST /api/promo/validate - Validate promo code
router.post("/validate", validatePromoCode);

// GET /api/promo/:id - Get promo code by ID
router.get("/get/:id", getPromoCodeById);

// PUT /api/promo/:id - Update promo code
router.put("/update/:id", updatePromoCode);

// DELETE /api/promo/:id - Delete promo code
router.delete("/delete/:id", deletePromoCode);

export default router;
