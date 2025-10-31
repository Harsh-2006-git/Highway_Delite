// controllers/listingController.js
import Listing from "../models/Listing.js";

// Create a new listing
export const createListing = async (req, res) => {
  try {
    const { title, description, image_url, about, price } = req.body;

    // Validate required fields
    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    const listing = await Listing.create({
      title,
      description,
      image_url,
      about,
      price,
    });

    return res.status(201).json({
      success: true,
      message: "Listing created successfully",
      data: listing,
    });
  } catch (error) {
    console.error("Error creating listing:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get all listings
export const getAllListings = async (req, res) => {
  try {
    const listings = await Listing.findAll({
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      message: "Listings retrieved successfully",
      data: listings,
      count: listings.length,
    });
  } catch (error) {
    console.error("Error fetching listings:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get listing by ID
export const getListingById = async (req, res) => {
  try {
    const { id } = req.params;

    const listing = await Listing.findByPk(id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Listing retrieved successfully",
      data: listing,
    });
  } catch (error) {
    console.error("Error fetching listing:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Delete listing by ID
export const deleteListing = async (req, res) => {
  try {
    const { id } = req.params;

    const listing = await Listing.findByPk(id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    await listing.destroy();

    return res.status(200).json({
      success: true,
      message: "Listing deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting listing:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Update listing by ID
export const updateListing = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image_url, about, price } = req.body;

    const listing = await Listing.findByPk(id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    // Update only the provided fields
    await listing.update({
      title: title || listing.title,
      description:
        description !== undefined ? description : listing.description,
      image_url: image_url !== undefined ? image_url : listing.image_url,
      about: about !== undefined ? about : listing.about,
      price: price !== undefined ? price : listing.price,
    });

    return res.status(200).json({
      success: true,
      message: "Listing updated successfully",
      data: listing,
    });
  } catch (error) {
    console.error("Error updating listing:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
