// seedData.js
import sequelize from "./config/database.js";
import Listing from "./models/Listing.js";
import PromoCode from "./models/PromoCode.js";

const seedListings = [
  {
    title: "Nandi Hills Sunrise",
    description:
      "Experience breathtaking sunrise views from Nandi Hills. Perfect for photography enthusiasts and nature lovers.",
    image_url:
      "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    about:
      "Early morning trek to Nandi Hills with guided tour. Includes breakfast and photography session.",
    price: 899.0,
  },
  {
    title: "Boat Cruise",
    description:
      "Explore the beautiful Sundarban mangroves with our guided boat cruise. Witness diverse wildlife.",
    image_url:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    about:
      "Full-day boat cruise with experienced guides. Lunch and safety equipment included.",
    price: 999.0,
  },

  {
    title: "Scuba Diving",
    description:
      "Explore the underwater world with certified scuba diving instructors.",
    image_url:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    about:
      "Beginner-friendly scuba diving experience. All equipment and training provided.",
    price: 2499.0,
  },
  {
    title: "Wildlife Safari",
    description:
      "Jeep safari through national park to spot tigers and other wildlife.",
    image_url:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    about:
      "Full-day wildlife safari with expert naturalist. Breakfast and lunch included.",
    price: 1599.0,
  },

  {
    title: "Yoga Retreat",
    description:
      "Peaceful yoga retreat in the mountains for mind and body wellness.",
    image_url:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    about:
      "3-day yoga retreat with expert instructors. Accommodation and vegetarian meals included.",
    price: 3499.0,
  },
  {
    title: "River Rafting",
    description:
      "Exciting white water river rafting adventure for thrill seekers.",
    image_url:
      "https://images.unsplash.com/photo-1591382386627-349b692688ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    about: "Grade 3-4 river rafting with safety gear and professional guides.",
    price: 1799.0,
  },
  {
    title: "Cultural Walk",
    description:
      "Explore ancient temples and historical sites with knowledgeable guides.",
    image_url:
      "https://images.unsplash.com/photo-1527525443983-6e60c75fff46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    about:
      "Half-day cultural walking tour. Includes entry fees and guide services.",
    price: 799.0,
  },
  {
    title: "Cooking Class",
    description:
      "Learn authentic local cuisine from expert chefs in traditional setting.",
    image_url:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    about:
      "3-hour cooking class with hands-on experience. Recipe book and meal included.",
    price: 1299.0,
  },

  {
    title: "Rock Climbing",
    description:
      "Professional rock climbing experience with certified instructors.",
    image_url:
      "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    about:
      "Full-day rock climbing session. All safety equipment and training provided.",
    price: 1599.0,
  },
  {
    title: "Bird Watching",
    description: "Guided bird watching tour in biodiversity-rich forest area.",
    image_url:
      "https://images.unsplash.com/photo-1421217336522-861978fdf33a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    about:
      "Early morning bird watching with expert ornithologist. Binoculars provided.",
    price: 899.0,
  },
  {
    title: "Cycling Tour",
    description: "Scenic cycling tour through countryside and villages.",
    image_url:
      "https://images.unsplash.com/photo-1511994298241-608e28f14fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    about:
      "Half-day cycling tour with quality bicycles. Refreshments and guide included.",
    price: 699.0,
  },
  {
    title: "Photography Workshop",
    description:
      "Learn photography techniques from professional photographers.",
    image_url:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    about:
      "Full-day photography workshop in scenic location. Camera equipment can be rented.",
    price: 2199.0,
  },
  {
    title: "Camping Adventure",
    description: "Overnight camping experience with bonfire and stargazing.",
    image_url:
      "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    about:
      "2-day camping trip with all equipment provided. Meals and activities included.",
    price: 1899.0,
  },
  {
    title: "Heritage Tour",
    description: "Explore UNESCO World Heritage sites with expert historians.",
    image_url:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    about:
      "Full-day heritage tour with audio guides. Transportation and entry fees included.",
    price: 1399.0,
  },
  {
    title: "Spa Retreat",
    description: "Luxurious spa and wellness retreat for complete relaxation.",
    image_url:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    about:
      "Full-day spa retreat with multiple treatments. Healthy meals and pool access included.",
    price: 3999.0,
  },
];

const seedPromoCodes = [
  {
    code: "SAVE10",
    discount_type: "percentage",
    discount_value: 10,
    min_order_amount: 1000,
    valid_until: new Date("2026-12-31"),
    is_active: true,
  },
  {
    code: "FLAT100",
    discount_type: "fixed",
    discount_value: 100,
    min_order_amount: 500,
    valid_until: new Date("2026-12-31"),
    is_active: true,
  },
  {
    code: "WELCOME15",
    discount_type: "percentage",
    discount_value: 15,
    min_order_amount: 1500,
    valid_until: new Date("2026-11-30"),
    is_active: true,
  },
  {
    code: "SUMMER20",
    discount_type: "percentage",
    discount_value: 20,
    min_order_amount: 2000,
    valid_until: new Date("2026-09-30"),
    is_active: true,
  },
  {
    code: "FLAT200",
    discount_type: "fixed",
    discount_value: 200,
    min_order_amount: 1000,
    valid_until: new Date("2026-10-31"),
    is_active: true,
  },
  {
    code: "QUICK50",
    discount_type: "fixed",
    discount_value: 50,
    min_order_amount: 300,
    valid_until: new Date("2026-12-31"),
    is_active: true,
  },
  {
    code: "ADVENTURE25",
    discount_type: "percentage",
    discount_value: 25,
    min_order_amount: 2500,
    valid_until: new Date("2026-08-31"),
    is_active: true,
  },
  {
    code: "FIRST5",
    discount_type: "percentage",
    discount_value: 5,
    min_order_amount: 0,
    valid_until: new Date("2026-12-31"),
    is_active: true,
  },
];

const seedDatabase = async () => {
  try {
    // Sync database
    await sequelize.sync({ force: false }); // Set to true to reset database

    console.log("Database synced successfully");

    // Seed Listings
    const createdListings = await Listing.bulkCreate(seedListings, {
      ignoreDuplicates: true,
    });
    console.log(`✅ ${createdListings.length} listings created successfully`);

    // Seed Promo Codes
    const createdPromoCodes = await PromoCode.bulkCreate(seedPromoCodes, {
      ignoreDuplicates: true,
    });
    console.log(
      `✅ ${createdPromoCodes.length} promo codes created successfully`
    );

    console.log("🎉 Database seeding completed successfully!");

    // Display sample data
    console.log("\n📋 Sample Listings:");
    createdListings.slice(0, 5).forEach((listing) => {
      console.log(`- ${listing.title}: ₹${listing.price}`);
    });

    console.log("\n🎫 Sample Promo Codes:");
    createdPromoCodes.slice(0, 3).forEach((promo) => {
      console.log(
        `- ${promo.code}: ${
          promo.discount_type === "percentage"
            ? `${promo.discount_value}% off`
            : `₹${promo.discount_value} off`
        }`
      );
    });
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
  }
};

// Run the seeder
export default seedDatabase();
