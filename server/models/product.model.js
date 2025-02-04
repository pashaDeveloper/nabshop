/* واردات خارجی */
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const baseSchema = require("./baseSchema.model");
const Counter = require("./counter")
const Category = require("./category.model");
const Tag = require("./tag.model");

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: Number,
      unique: true,
    },
    title: {
      type: String,
      required: [true, "لطفاً عنوان محصول را وارد کنید"],
      trim: true,
      unique: [true, "محصول مشابه قبلاً ثبت شده است"],
      maxLength: [100, "عنوان نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد"],
    },
    slug: {
      type: String,
      unique: true,
      required: false,
      default: function() {
        return this.title.toString()
          .trim()
          .toLowerCase()
          .replace(/[\u200B-\u200D\uFEFF]/g, "")
          .replace(/[\s\ـ]+/g, "-")
          .replace(/[^\u0600-\u06FFa-z0-9\-]/g, "")
          .replace(/-+/g, "-")
          .replace(/^-+|-+$/g, "");
      },  
    },
    summary: {
      type: String,
      required: [true, "لطفاً خلاصه محصول را وارد کنید"],
      trim: true,
      minlength: [20, "خلاصه محصول باید حداقل ۲۰ کاراکتر باشد"],
      maxlength: [30, "خلاصه محصول نمی‌تواند بیشتر از ۳۰ کاراکتر باشد"],
    },
    description: {
      type: String,
      required: [true, "لطفاً خلاصه محصول را وارد کنید"],
      trim: true,
      maxLength: [500, "خلاصه نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد"],
    },
    thumbnail: {
  url: {
    type: String,
    required: [true, "لطفاً لینک تصویر بندانگشتی را وارد کنید"],
    default: "https://placehold.co/296x200.png",
  },
  public_id: {
    type: String,
    default: "N/A",
  },
},

gallery: {
  type: [
    {
      url: {
        type: String,
        required: [true, "لطفاً لینک تصویر گالری را وارد کنید"],
        default: "https://placehold.co/296x200.png",
      },
      public_id: {
        type: String,
        default: "N/A",
      },
    },
  ],
  validate: {
    validator: function (value) {
      return value.length <= 10;
    },
    message: "امکان افزودن بیش از ۱۰ تصویر در گالری وجود ندارد",
  },
},
    features: [
      {
        title: {
          type: String,
          required: [true, "لطفاً عنوان ویژگی را وارد کنید"],
          maxLength: [100, "عنوان ویژگی نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد"],
        },
        content: {
          type: [String],
          required: [true, "لطفاً محتوای ویژگی را وارد کنید"],
          maxLength: [200, "محتوا نمی‌تواند بیشتر از ۲۰۰ کاراکتر باشد"],
        },
      },
    ],

    views: {
      type: Number,
      default: 0,
      min: [0, "تعداد بازدید نمی‌تواند منفی باشد"],
    },

    variations: [
      {
        unit: {
          type: ObjectId,
          ref: "Unit",
        },
        price: {
          type: Number,
          required: [true, "لطفاً قیمت را وارد کنید"],
        },
        stock: {
          type: Number,
          required: [true, "لطفاً تعداد موجود را وارد کنید"],
          default: 0,
        },
        lowStockThreshold: {
          type: Number,
          required: [true, "لطفاً حد آستانه موجودی را مشخص کنید"],
          default: 10,
        },
      },
    ],

    campaign: {
      title: {
        type: String,
      },
      state: {
        type: String,
        enum: ["new-arrival", "discount", "sold-out", "on-sale"],
      },
    },

    
    discountAmount: {
      type: Number,
      default: 0,
    },

    stockStatus: {
      type: String,
      enum: ["in-stock", "out-of-stock", "low-stock"],
      default: "in-stock",
    },

   
    category: {
      type: ObjectId,
      ref: "Category",
    },

    buyers: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],

    reviews: [
      {
        type: ObjectId,
        ref: "Review",
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    tags: [
      {
        type: ObjectId,
        ref: "Tag",
        required: [true, "تگ محصول الزامی است"],
      },
    ],
       metaTitle: {
      type: String,
      maxLength: [60, "متا تایتل نمی‌تواند بیشتر از ۶۰ کاراکتر باشد"],
      default: "",
    },
    metaDescription: {
      type: String,
      maxLength: [160, "متا توضیحات نمی‌تواند بیشتر از ۱۶۰ کاراکتر باشد"],
      default: "",
    },
    metaKeywords: {
      type: [String],
      default: [],
    },
    metaRobots: {
      type: String,
      enum: ["index, follow", "noindex, nofollow", "index, nofollow", "noindex, follow"],
      default: "index, follow",
    },
    canonicalUrl: {
      type: String,
      required: false,
      trim: true,
      validate: {
        validator: function(v) {
          return /^(https?:\/\/[^\s$.?#].[^\s]*)$/.test(v);
        },
        message: "URL معتبر نیست",
      },
    },
    ...baseSchema.obj,
  },
  { timestamps: true }
);
productSchema.pre("save", async function (next) {
  if (!this.isNew || this.productId) {
    return next();
  }

  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "productId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.productId = counter.seq;

    // تنظیم وضعیت موجودی برای هر variation
    if (this.variations && this.variations.length > 0) {
      this.variations.forEach((variation) => {
        if (variation.stock === 0) {
          variation.stockStatus = "out-of-stock";
        } else if (variation.stock < variation.lowStockThreshold) {
          variation.stockStatus = "low-stock";
        } else {
          variation.stockStatus = "in-stock";
        }
      });
    }

    // تنظیم وضعیت کلی موجودی محصول
    if (this.variations.some(variation => variation.stock === 0)) {
      this.stockStatus = "out-of-stock";
    } else if (this.variations.some(variation => variation.stock < variation.lowStockThreshold)) {
      this.stockStatus = "low-stock";
    } else {
      this.stockStatus = "in-stock";
    }

    // سایر تنظیمات مربوط به metaTitle، metaDescription و metaKeywords
    if (
      this.isModified("title") ||
      !this.metaTitle ||
      !this.metaDescription ||
      this.metaKeywords.length === 0
    ) {
      try {
        const category = await Category.findById(this.category);
        if (category) {
          let combinedMetaTitle = `${this.title} | ${category.title}`;
          if (combinedMetaTitle.length > 60) {
            const excessLength = combinedMetaTitle.length - 60;
            combinedMetaTitle = `${this.title.substring(0, this.title.length - excessLength)} | ${category.title}`;
          }
          this.metaTitle = combinedMetaTitle;

          let combinedMetaDescription = `${this.summary} | ${category.title}`;
          if (combinedMetaDescription.length > 160) {
            const excessLength = combinedMetaDescription.length - 160;
            combinedMetaDescription = `${this.summary.substring(0, this.summary.length - excessLength)} | ${category.title}`;
          }
          this.metaDescription = combinedMetaDescription;
        } else {
          this.metaTitle = this.title.length > 60 ? this.title.substring(0, 57) + "..." : this.title;
          this.metaDescription = this.summary.length > 160 ? this.summary.substring(0, 157) + "..." : this.summary;
        }

        /* تنظیم کلیدواژه‌های متا */
        const tags = await Tag.find({ _id: { $in: this.tags } });
        const tagKeywords = tags.map((tag) => tag.title);
        this.metaKeywords = tagKeywords.slice(0, 10);
      } catch (error) {
        console.error("خطا در تنظیم metaTitle، metaDescription و metaKeywords:", error);
      }
    }

    next();
  } catch (error) {
    console.error("خطا در تنظیم مقدار محصول:", error);
    next(error);
  }
});


const Product = mongoose.model("Product", productSchema);

module.exports = Product;