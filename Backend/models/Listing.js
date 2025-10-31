// models/Listing.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Listing = sequelize.define(
  "Listing",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image_url: {
      type: DataTypes.STRING(512),
      allowNull: true,
      validate: { isUrl: true },
    },
    about: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
  },
  {
    tableName: "listings",
    timestamps: true,
  }
);

export default Listing;
