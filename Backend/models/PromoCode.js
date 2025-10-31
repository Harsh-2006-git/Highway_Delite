// models/PromoCode.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const PromoCode = sequelize.define(
  "PromoCode",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    discount_type: {
      type: DataTypes.ENUM("percentage", "fixed"),
      allowNull: false,
    },
    discount_value: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    min_order_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0,
    },
    valid_until: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "promo_codes",
    timestamps: true,
  }
);

export default PromoCode;
