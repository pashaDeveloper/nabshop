/* واردات خارجی */
const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;
const path = require("path");

/* ایجاد اسکیمای دسته‌بندی */
const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "لطفاً نام دسته‌بندی را وارد کنید"],
      trim: true,
      unique: [true, "دسته‌بندی مشابه از قبل وجود دارد"],
      maxLength: [100, "عنوان شما باید حداکثر ۱۰۰ کاراکتر باشد"],
    },

    description: {
      type: String,
      required: [true, "لطفاً توضیحات دسته‌بندی را وارد کنید"],
      trim: true,
      maxLength: [500, "توضیحات شما باید حداکثر ۵۰۰ کاراکتر باشد"],
    },

    thumbnail: {
      url: {
        type: String,
        validate: {
          validator: function (v) {
            return path.isAbsolute(v);
          },
          message: "لطفاً یک مسیر محلی معتبر برای تصویر بندانگشتی وارد کنید",
        },
        default: "/uploads/default-thumbnail.png",
      },
      public_id: {
        type: String,
        default: "N/A",
      },
    },

    keynotes: [
      {
        type: String,
        trim: true,
      },
    ],

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    products: [
      {
        type: ObjectId,
        ref: "Product",
      },
    ],

    creator: {
      type: ObjectId,
      ref: "User",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

categorySchema.pre("save", function (next) {
  let splitStr = this.title?.toLowerCase().split(" ");
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  this.title = splitStr.join(" ");

  const newTags = [];
  this.tags.forEach((tag) =>
    newTags.push(tag.replace(" ", "-")?.toLowerCase())
  );
  this.tags = newTags;

  next();
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
