const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "لطفا نام کامل خود را وارد کنید"],
      trim: true,
      maxLength: [100, "نام شما باید حداکثر 100 کاراکتر باشد"],
    },

    email: {
      type: String,
      required: [true, "لطفا آدرس ایمیل خود را وارد کنید"],
      validate: [validator.isEmail, "لطفا یک آدرس ایمیل معتبر وارد کنید"],
      unique: [true, "این ایمیل قبلا ثبت شده است. لطفا ایمیل جدید وارد کنید"],
    },

    // رمز عبور
    password: {
      type: String,
      required: [true, "لطفا یک رمز عبور قوی وارد کنید"],
      minLength: [6, "رمز عبور باید حداقل 6 کاراکتر باشد"],
      maxLength: [20, "رمز عبور باید حداکثر 20 کاراکتر باشد"],
    },

    // آواتار
    avatar: {
      url: {
        type: String,
        default: "https://placehold.co/300x300.png",
      },
      public_id: {
        type: String,
        default: "N/A",
      },
    },

    // شماره تماس
    phone: {
      type: String,
      required: [
        // true,
        // "لطفا شماره تماس خود را وارد کنید، به عنوان مثال: +8801xxxxxxxxx",
      ],
      // validate: {
      //   validator: (value) =>
      //     validator.isMobilePhone(value, "bn-BD", { strictMode: true }),
      //   message:
      //     "شماره تماس {VALUE} معتبر نیست. لطفا دوباره وارد کنید به شکل +8801xxxxxxxxx",
      // },
      unique: true,
    },

    // نقش کاربر
    role: {
      type: String,
      enum: ["superAdmin","admin","operator", "buyer", "seller"],
      default: "buyer",
    },

    // وضعیت حساب
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    // سبد خرید
    cart: [
      {
        type: ObjectId,
        ref: "Cart",
      },
    ],

    // لیست علاقه‌مندی‌ها
    favorites: [
      {
        type: ObjectId,
        ref: "Favorite",
      },
    ],

    // نظرات
    reviews: [
      {
        type: ObjectId,
        ref: "Review",
      },
    ],

    // خریدها
    purchases: [
      {
        type: ObjectId,
        ref: "Purchase",
      },
    ],

    // ایجاد فروشگاه
    store: {
      type: ObjectId,
      ref: "Store",
    },

    // ایجاد برند
    brand: {
      type: ObjectId,
      ref: "Brand",
    },

    // ایجاد دسته‌بندی
    category: {
      type: ObjectId,
      ref: "Category",
    },

    // خرید محصولات
    products: [
      {
        type: ObjectId,
        ref: "Product",
      },
    ],

    // آدرس
    address: {
      type: String,
      default: "N/A",
      trim: true,
      maxLength: [500, "آدرس شما باید حداکثر 500 کاراکتر باشد"],
    },

    // زمان‌های ایجاد حساب کاربری
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

/* رمزگذاری رمز عبور کاربر */
userSchema.methods.encryptedPassword = function (password) {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  return hashedPassword;
};

/* میدلور برای رمزگذاری رمز عبور */
userSchema.pre("save", async function (next) {
  try {
    // رمزگذاری رمز عبور در صورت تغییر
    if (!this.isModified("password")) {
      return next();
    }

    this.password = this.encryptedPassword(this.password);
  } catch (error) {
    next(error);
  }
});

/* مقایسه رمز عبور در زمان ورود */
userSchema.methods.comparePassword = function (password, hash) {
  const isPasswordValid = bcrypt.compareSync(password, hash);
  return isPasswordValid;
};

/* ایجاد مدل کاربر */
const User = mongoose.model("User", userSchema);

/* اکسپورت مدل کاربر */
module.exports = User;
