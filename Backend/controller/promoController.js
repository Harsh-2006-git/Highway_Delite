// controllers/promoController.js
import PromoCode from "../models/PromoCode.js";

// Create a new promo code
export const createPromoCode = async (req, res) => {
  try {
    const {
      code,
      discount_type,
      discount_value,
      min_order_amount,
      valid_until,
      is_active,
    } = req.body;

    // Validate required fields
    if (!code || !discount_type || !discount_value || !valid_until) {
      return res.status(400).json({
        success: false,
        message:
          "Code, discount_type, discount_value, and valid_until are required fields",
      });
    }

    // Validate discount_type
    if (!["percentage", "fixed"].includes(discount_type)) {
      return res.status(400).json({
        success: false,
        message: "Discount type must be either 'percentage' or 'fixed'",
      });
    }

    // Validate discount_value
    if (discount_value <= 0) {
      return res.status(400).json({
        success: false,
        message: "Discount value must be greater than 0",
      });
    }

    // For percentage discount, ensure it's between 1-100
    if (
      discount_type === "percentage" &&
      (discount_value < 1 || discount_value > 100)
    ) {
      return res.status(400).json({
        success: false,
        message: "Percentage discount must be between 1 and 100",
      });
    }

    // Check if promo code already exists
    const existingCode = await PromoCode.findOne({
      where: { code: code.toUpperCase() },
    });

    if (existingCode) {
      return res.status(409).json({
        success: false,
        message: "Promo code already exists",
      });
    }

    const promoCode = await PromoCode.create({
      code: code.toUpperCase(),
      discount_type,
      discount_value,
      min_order_amount: min_order_amount || 0,
      valid_until: new Date(valid_until),
      is_active: is_active !== undefined ? is_active : true,
    });

    return res.status(201).json({
      success: true,
      message: "Promo code created successfully",
      data: promoCode,
    });
  } catch (error) {
    console.error("Error creating promo code:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get all promo codes
export const getAllPromoCodes = async (req, res) => {
  try {
    const { active_only } = req.query;

    let whereCondition = {};

    // Filter active promo codes only if requested
    if (active_only === "true") {
      whereCondition.is_active = true;
      whereCondition.valid_until = {
        [Op.gte]: new Date(), // Only codes that haven't expired
      };
    }

    const promoCodes = await PromoCode.findAll({
      where: whereCondition,
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      message: "Promo codes retrieved successfully",
      data: promoCodes,
      count: promoCodes.length,
    });
  } catch (error) {
    console.error("Error fetching promo codes:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Validate and use promo code
export const validatePromoCode = async (req, res) => {
  try {
    const { code, order_amount } = req.body;

    // Validate required fields
    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Promo code is required",
      });
    }

    if (!order_amount || order_amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid order amount is required",
      });
    }

    // Find active promo code
    const promoCode = await PromoCode.findOne({
      where: {
        code: code.toUpperCase(),
        is_active: true,
      },
    });

    // Check if promo code exists
    if (!promoCode) {
      return res.status(404).json({
        success: false,
        message: "Invalid promo code",
      });
    }

    const currentDate = new Date();
    const validUntil = new Date(promoCode.valid_until);

    // Check validity period
    if (currentDate > validUntil) {
      return res.status(400).json({
        success: false,
        message: "Promo code has expired",
      });
    }

    // Check minimum order amount
    if (
      promoCode.min_order_amount &&
      order_amount < promoCode.min_order_amount
    ) {
      return res.status(400).json({
        success: false,
        message: `Minimum order amount of ${promoCode.min_order_amount} required for this promo`,
      });
    }

    // Calculate discount
    let discount = 0;
    let final_amount = order_amount;

    if (promoCode.discount_type === "percentage") {
      discount = (order_amount * promoCode.discount_value) / 100;
    } else if (promoCode.discount_type === "fixed") {
      discount = promoCode.discount_value;

      // Ensure fixed discount doesn't exceed order amount
      if (discount > order_amount) {
        discount = order_amount;
      }
    }

    final_amount = order_amount - discount;

    // Ensure final amount is not negative
    if (final_amount < 0) {
      final_amount = 0;
    }

    return res.status(200).json({
      success: true,
      message: "Promo code applied successfully",
      data: {
        promo_code: promoCode.code,
        discount_type: promoCode.discount_type,
        discount_value: parseFloat(promoCode.discount_value),
        discount_amount: parseFloat(discount.toFixed(2)),
        original_amount: parseFloat(order_amount),
        final_amount: parseFloat(final_amount.toFixed(2)),
        min_order_amount: promoCode.min_order_amount
          ? parseFloat(promoCode.min_order_amount)
          : 0,
      },
    });
  } catch (error) {
    console.error("Error validating promo code:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get promo code by ID
export const getPromoCodeById = async (req, res) => {
  try {
    const { id } = req.params;

    const promoCode = await PromoCode.findByPk(id);

    if (!promoCode) {
      return res.status(404).json({
        success: false,
        message: "Promo code not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Promo code retrieved successfully",
      data: promoCode,
    });
  } catch (error) {
    console.error("Error fetching promo code:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Update promo code
export const updatePromoCode = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      code,
      discount_type,
      discount_value,
      min_order_amount,
      valid_until,
      is_active,
    } = req.body;

    const promoCode = await PromoCode.findByPk(id);

    if (!promoCode) {
      return res.status(404).json({
        success: false,
        message: "Promo code not found",
      });
    }

    // Check if code already exists (excluding current promo code)
    if (code && code !== promoCode.code) {
      const existingCode = await PromoCode.findOne({
        where: { code: code.toUpperCase() },
      });

      if (existingCode) {
        return res.status(409).json({
          success: false,
          message: "Promo code already exists",
        });
      }
    }

    await promoCode.update({
      code: code ? code.toUpperCase() : promoCode.code,
      discount_type: discount_type || promoCode.discount_type,
      discount_value: discount_value || promoCode.discount_value,
      min_order_amount:
        min_order_amount !== undefined
          ? min_order_amount
          : promoCode.min_order_amount,
      valid_until: valid_until ? new Date(valid_until) : promoCode.valid_until,
      is_active: is_active !== undefined ? is_active : promoCode.is_active,
    });

    return res.status(200).json({
      success: true,
      message: "Promo code updated successfully",
      data: promoCode,
    });
  } catch (error) {
    console.error("Error updating promo code:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Delete promo code
export const deletePromoCode = async (req, res) => {
  try {
    const { id } = req.params;

    const promoCode = await PromoCode.findByPk(id);

    if (!promoCode) {
      return res.status(404).json({
        success: false,
        message: "Promo code not found",
      });
    }

    await promoCode.destroy();

    return res.status(200).json({
      success: true,
      message: "Promo code deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting promo code:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
