const express = require("express");
const cors = require("cors");
require("dotenv").config();
const session = require("express-session");

/* internal import */
const error = require("./middleware/error.middleware");

/* application level connection */
const app = express();

/* allowed origins */
const allowedOrigins = [
  process.env.NEXT_PUBLIC_CLIENT_URL, // دامنه‌های مجاز برای درخواست‌ها
  process.env.NEXT_PUBLIC_DASHBOARD_URL // می‌توانید دامنه‌های دیگری هم اضافه کنید
];

/* cors configuration */
const corsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, 
      httpOnly: true,
      
    }
  })
);

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
app.use("/api/session", require("./routes/session.route"));

/* global error handler */
app.use(error);


/* export application */
module.exports = app;
