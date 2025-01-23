

/* external imports */
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const baseSchema = require("./baseSchema.model");
/* create cart schema */
const cartSchema = new mongoose.Schema(
  {
    cartId: {
      type: Number,
      unique: true,
    },
    // for product
    product: {
      type: ObjectId,
      ref: "Product",
    },

    // for user
    user: {
      type: ObjectId,
      ref: "User",
    },

    // for quantity
    quantity: {
      type: Number,
      default: 1,
    },

    ...baseSchema.obj
  },
  { timestamps: true }
);

cartSchema.pre("save", async function (next) {
  if (!this.isNew || this.cartId) {
    return next(); 
  }

  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "cartId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true } 
    );

    this.cartId = counter.seq; 
    next();
  } catch (error) {
    next(error);
  }
}); 
/* create cart schema */
const Cart = mongoose.model("Cart", cartSchema);

/* export cart schema */
module.exports = Cart;
