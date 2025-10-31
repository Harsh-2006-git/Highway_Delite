// routes/listingRoutes.js
import express from "express";
import {
  createListing,
  getAllListings,
  getListingById,
  updateListing,
  deleteListing,
} from "../controller/listingController.js";

const router = express.Router();

// POST /api/listings - Create new listing
router.post("/create", createListing);

// GET /api/listings - Get all listings
router.get("/experiences", getAllListings);

// GET /api/listings/:id - Get listing by ID
router.get("/experiences/:id", getListingById);

// PUT /api/listings/:id - Update listing by ID
router.put("/update/:id", updateListing);

// DELETE /api/listings/:id - Delete listing by ID
router.delete("/delete/:id", deleteListing);

export default router;
