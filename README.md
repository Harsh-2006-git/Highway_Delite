# 🧭 Experience Booking & Adventure Scheduler

A modern web application that allows users to **browse, search, and book experiences or adventures** like trekking, scuba diving, and yoga retreats.
Users can **apply promo codes, choose dates, set quantities, make payments, and confirm bookings** — all from a single clean interface.

---

## 🚀 Features

### 🏕️ User Features

* **Browse Experiences** – View a curated list of adventures with images, prices, and descriptions.
* **Search Functionality** – Instantly filter experiences by name or keyword.
* **Booking System** – Schedule experience date, time, and quantity.
* **Promo Code Support** – Apply discount or flat-rate coupons during checkout.
* **Responsive UI** – Works smoothly on both mobile and desktop.

### ⚙️ Admin/Backend Features

* **Dynamic Seeding** – Preloads demo listings and promo codes for testing.
* **API-based Architecture** – Clean RESTful routes for scalability.
* **Sequelize ORM** – Structured and relational database management.
* **Express.js Middleware** – Secured with Helmet, CORS, and custom error handling.
* **Modular Codebase** – Easy to extend or integrate with frontend frameworks.

---

## 🛠️ Tech Stack

| Layer          | Technology                                            |
| -------------- | ----------------------------------------------------- |
| **Backend**    | Node.js, Express.js                                   |
| **Database**   | MySQL (Aiven / Local instance)                        |
| **ORM**        | Sequelize                                             |
| **Frontend**   | React                                                 |
| **Security**   | Helmet, CORS, dotenv                                  |
| **Deployment** | Vercel (Frontend), Render,Aiven DataBase(Backend)     |

---

## 📦 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/experience-booking.git
cd experience-booking
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
PORT=3001
DATABASE_URL=postgres://username:password@hostname:port/databasename
```

### 4. Run the server

```bash
npm run dev
```

Server will start on:

```
http://localhost:3001
```

---

## 🌱 Database Seeding

You can automatically seed demo experiences and promo codes on startup.

To manually seed:

```bash
node src/seed.js
```

Sample listings include adventures like:

* Nandi Hills Sunrise 🌄
* Scuba Diving 🤿
* Yoga Retreat 🧘
* Wildlife Safari 🐅

---

## 🔗 API Routes Overview

| Method | Endpoint            | Description                                |
| ------ | ------------------- | ------------------------------------------ |
| `GET`  | `/experiences`      | Get all experiences                        |
| `GET`  | `/experiences/:id`  | Get a single experience                    |
| `POST` | `/experiences/book` | Book an experience with date/time/quantity |
| `GET`  | `/promo`            | List all promo codes                       |
| `POST` | `/promo/apply`      | Validate or apply a promo code             |

---

## 💳 Booking Flow

1. Browse experiences
2. Select an experience → choose **date**, **time**, and **quantity**
3. Apply a **promo code** (e.g., `SAVE10`, `FLAT100`)
4. Confirm and pay (or simulate payment)
5. Booking stored and confirmation displayed ✅

---

## 🧩 Folder Structure

```
src/
├── config/
│   └── database.js
├── models/
│   ├── Listing.js
│   └── PromoCode.js
├── routes/
│   ├── listingRoutes.js
│   └── promoRoutes.js
├── controllers/
│   ├── listingController.js
│   └── promoController.js
├── middlewares/
│   └── errorHandler.js
├── seed.js
└── index.js
```

---

## 🧠 Future Enhancements

* 🧾 Payment Gateway Integration (Stripe/Razorpay)
* 👥 User Accounts & Authentication
* 🗓️ Booking Management Dashboard
* 🪶 Reviews & Ratings
* 📍 Map Integration for Location-based Experiences

---

## 👨‍💻 Author

**Harsh Manmode**

---

