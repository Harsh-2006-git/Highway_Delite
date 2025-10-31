import * as dotenv from "dotenv";
dotenv.config();
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME, // defaultdb
  process.env.DB_USER, // avnadmin
  process.env.DB_PASSWORD, // AVNS_22YIvQEWS9-Be-0GPKs
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: "mysql",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // allow self-signed certs
      },
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const connectDB = async () => {
  console.log("Database connection attempt...");
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully.");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
  }
};

export { sequelize, connectDB };
export default sequelize;
