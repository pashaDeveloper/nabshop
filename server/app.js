const express = require("express");
const cors = require("cors");
require("dotenv").config();

/* internal import */
const error = require("./middleware/error.middleware");

/* application level connection */
const app = express();

/* allowed origins */
const allowedOrigins = process.env.ORIGIN_URLS.split(","); // لیستی از آدرس‌ها که در فایل .env تعریف شده‌اند

/* middleware connections */
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET, PATCH, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(express.json());

/* router level connections */
app.use("/api/brand", require("./routes/brand.route"));
app.use("/api/category", require("./routes/category.route"));
app.use("/api/product", require("./routes/product.route"));
app.use("/api/store", require("./routes/store.route"));
app.use("/api/user", require("./routes/user.route"));
app.use("/api/cart", require("./routes/cart.route"));
app.use("/api/favorite", require("./routes/favorite.route"));
app.use("/api/review", require("./routes/review.route"));
app.use("/api/payment", require("./routes/payment.route"));
app.use("/api/purchase", require("./routes/purchase.route"));

/* global error handler */
app.use(error);

/* connection establishment */
app.get("/", (req, res, next) => {
  try {
    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "The request is OK",
    });
  } catch (err) {
    next(err);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
});

/* export application */
module.exports = app;
