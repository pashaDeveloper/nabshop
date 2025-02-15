const express = require("express");
const cors = require("cors");
require("dotenv").config();

/* internal import */
const error = require("./middleware/error.middleware");

/* application level connection */
const app = express();

/* allowed origins */
const allowedOrigins = [
  process.env.NEXT_PUBLIC_CLIENT_URL,  // دامنه‌های مجاز برای درخواست‌ها
  process.env.NEXT_PUBLIC_DASHBOARD_URL, // می‌توانید دامنه‌های دیگری هم اضافه کنید
];

/* cors configuration */
const corsOptions = {
  origin: allowedOrigins, 
  methods: ["GET", "POST", "PATCH", "DELETE"], 
  allowedHeaders: ["Content-Type", "Authorization"],  
  credentials: true,  
};

app.use(cors(corsOptions));

app.use(express.json());

/* router level connections */
app.use("/api/unit", require("./routes/unit.route"));
app.use("/api/tag", require("./routes/tag.route"));
app.use("/api/category", require("./routes/category.route"));
app.use("/api/product", require("./routes/product.route"));
app.use("/api/user", require("./routes/user.route"));
app.use("/api/cart", require("./routes/cart.route"));
app.use("/api/favorite", require("./routes/favorite.route"));
app.use("/api/review", require("./routes/review.route"));
app.use("/api/payment", require("./routes/payment.route"));
app.use("/api/purchase", require("./routes/purchase.route"));
app.use("/api/post", require("./routes/post.route"));

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
