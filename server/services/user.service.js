const Brand = require("../models/brand.model");
const Cart = require("../models/cart.model");
const Category = require("../models/category.model");
const Favorite = require("../models/favorite.model");
const Product = require("../models/product.model");
const Purchase = require("../models/purchase.model");
const Review = require("../models/review.model");
const Store = require("../models/store.model");
const User = require("../models/user.model");
const remove = require("../utils/remove.util");
const token = require("../utils/token.util");

/* sign up an user */
exports.signUp = async (req, res) => {
  const { body, file } = req;
  const { name, email, password, phone, avatarUrl } = body;

  if (!name || !email || !password || !phone) {
    return res.status(400).json({
      acknowledgement: false,
      message: "درخواست نادرست",
      description: "همه فیلدها الزامی است",
      isSuccess: false
    });
  }

  const existingUser = await User.findOne({
    $or: [{ email: email }, { phone: phone }]
  });
  if (existingUser) {
    return {
      success: false,
      message:
        "کاربری با این ایمیل یا شماره تلفن قبلاً ثبت‌نام کرده است. لطفاً به صفحه ورود بروید.",
      redirectToLogin: true
    };
  }

  if (
    req.uploadedFiles &&
    req.uploadedFiles["avatar"] &&
    req.uploadedFiles["avatar"].length > 0
  ) {
    avatar = {
      url: req.uploadedFiles["avatar"][0].url,
      public_id: req.uploadedFiles["avatar"][0].key
    };
  } else {
    avatar = {
      url: avatarUrl,
      public_id: null
    };
  }
  const userCount = await User.countDocuments();
  const role = userCount === 0 ? "superAdmin" : "buyer";
  const status = userCount === 0 ? "active" : "inactive";

  const user = new User({
    name: body.name,
    email: body.email,
    password: body.password,
    phone: body.phone,
    role: role,
    status: status,
    avatar
  });

  await user.save();

  res.status(201).json({
    acknowledgement: true,
    message: "تبریک ",
    description: "ثبت نام شما با موفقیت انجام شد",
    isSuccess: true
  });

  return user;
};

/* sign in an user */
exports.signIn = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  console.log("user", user);
  if (!user) {
    res.status(404).json({
      acknowledgement: false,
      message: "Not Found",
      description: "کاربر یافت نشد"
    });
  } else {
    const isPasswordValid = user.comparePassword(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      res.status(401).json({
        acknowledgement: false,
        message: "Unauthorized",
        description: "رمز عبور صحیح نیست"
      });
    } else {
      if (user.status === "inactive") {
        res.status(401).json({
          acknowledgement: false,
          message: "Unauthorized",
          description: "حساب شما در حال حاضر  غیر فعال است لطفا منتظر بمانید"
        });
      } else {
        const accessToken = token({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status
        });

        res.status(200).json({
          acknowledgement: true,
          message: "OK",
          description: "شمابا موفقیت ورود کردید",
          accessToken
        });
      }
    }
  }
};

/* reset user password */
exports.forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(404).json({
      acknowledgement: false,
      message: "Not Found",
      description: "کاربر یافت نشد"
    });
  } else {
    const hashedPassword = user.encryptedPassword(req.body.password);

    await User.findOneAndUpdate(
      { email: req.body.email },
      { password: hashedPassword },
      { runValidators: false, returnOriginal: false }
    );

    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "پسورد کاربر با موفقیت تغییر کرد"
    });
  }
};

/* login persistance */
exports.persistLogin = async (req, res) => {
  const user = await User.findById(req.user._id).populate([
    {
      path: "cart",
      populate: [{ path: "product", populate: ["category"] }, "user"]
    },
    {
      path: "reviews",
      populate: ["product", "reviewer"]
    },
    {
      path: "favorites",
      populate: [
        {
          path: "product",
          populate: ["category"]
        },
        "user"
      ]
    },
    {
      path: "purchases",
      populate: ["customer", "products.product"]
    },
    "products"
  ]);

  if (!user) {
    res.status(404).json({
      acknowledgement: false,
      message: "Not Found",
      description: "کاربر یافت نشد"
    });
  } else {
    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "ورود با موفقیت انجام شد",
      data: user
    });
  }
};

/* get all users */
exports.getUsers = async (res) => {
  const users = await User.find();

  res.status(200).json({
    acknowledgement: true,
    message: "OK",
    description: "دریافت موفق کاربران",
    data: users
  });
};

/* get single user */
exports.getUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    acknowledgement: true,
    message: "OK",
    description: `اطلاعات کاربر${user.name}' با موفقیت دریافت شد`,
    data: user
  });
};

/* update user information */
exports.updateUser = async (req, res) => {
  const existingUser = await User.findById(req.user._id);
  const user = req.body;

  // بررسی عدم تغییر نقش superAdmin
  if (user.role === "superAdmin") {
    return res.status(403).json({
      acknowledgement: false,
      message: "Forbidden",
      description: "کاربر مدیر کل قابل ویرایش نیست",
    });
  }

  // حذف تصویر آواتار قدیمی اگر تصویر جدیدی ارسال شده
  if (
    req.uploadedFiles &&
    req.uploadedFiles["avatar"] &&
    req.uploadedFiles["avatar"].length > 0
  ) {
    // حذف تصویر قبلی از سرویس ذخیره‌سازی
    await remove("avatar", existingUser.avatar?.public_id);

    // تنظیم تصویر جدید
    avatar = {
      url: req.uploadedFiles["avatar"][0].url,
      public_id: req.uploadedFiles["avatar"][0].key,
    };
  } else if (!req.body.avatarUrl) {
    // اگر تصویر جدید نیست، حذف تصویر قبلی
    if (existingUser.avatar?.public_id) {
      await remove("avatar", existingUser.avatar.public_id);
    }

    // در صورت عدم ارسال آدرس جدید برای تصویر، مقدار پیش‌فرض
    avatar = {
      url: null,
      public_id: null,
    };
  }

  // به‌روزرسانی اطلاعات کاربر
  const updatedUser = await User.findByIdAndUpdate(
    existingUser._id,
    {
      $set: {
        ...user,
        avatar, // اطمینان از ارسال تصویر جدید
      },
    },
    {
      runValidators: true,
      new: true, // اطمینان از اینکه داده‌های به‌روزرسانی‌شده برگردند
    }
  );

  res.status(200).json({
    acknowledgement: true,
    message: "OK",
    description: `اطلاعات ${updatedUser.name} با موفقیت تغییر کرد`,
  });
};


/* update user information */
exports.updateUserInfo = async (req, res) => {
  const existingUser = await User.findById(req.params.id);
  const user = req.body;

  // بررسی عدم تغییر نقش superAdmin
  if (user.role === "superAdmin") {
    return res.status(403).json({
      acknowledgement: false,
      message: "دسترسی ممنوع",
      description: "کاربر مدیر کل قابل ویرایش نیست",
    });
  }

  // متغیر avatar برای ذخیره‌سازی اطلاعات آواتار جدید
  let avatar = existingUser.avatar;

  // حذف تصویر آواتار قدیمی اگر تصویر جدیدی ارسال شده
  if (
    req.uploadedFiles &&
    req.uploadedFiles["avatar"] &&
    req.uploadedFiles["avatar"].length > 0
  ) {
    // حذف تصویر قبلی از سرویس ذخیره‌سازی
    await remove("avatar", existingUser.avatar?.public_id);

    // تنظیم تصویر جدید
    avatar = {
      url: req.uploadedFiles["avatar"][0].url,
      public_id: req.uploadedFiles["avatar"][0].key,
    };
  } else if (req.body.avatarUrl) {
    // اگر تصویر جدید نیست، حذف تصویر قبلی
    if (existingUser.avatar?.public_id) {
      await remove("avatar", existingUser.avatar.public_id);
    }

    // در صورت عدم ارسال آدرس جدید برای تصویر، مقدار پیش‌فرض
    avatar = {
      url: null,
      public_id: null,
    };
  }

  // به‌روزرسانی اطلاعات کاربر همراه با آواتار جدید
  const updatedUser = await User.findByIdAndUpdate(
    existingUser._id,
    { $set: { ...user, avatar } },  // اضافه کردن avatar به فیلدهای بروزرسانی
    {
      runValidators: true,  // اجرای اعتبارسنجی
      new: true  // دریافت داده‌های به‌روزرسانی‌شده
    }
  );

  res.status(200).json({
    acknowledgement: true,
    message: "OK",
    description: `اطلاعات ${updatedUser.name} با موفقیت تغییر کرد`
  });
};


/* delete user information */
exports.deleteUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      isDeleted: true,
      deletedAt: Date.now(),
    },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({
      acknowledgement: false,
      message: "کاربر یافت نشد",
    });
  }
  if (user.role === "superAdmin") {
    return res.status(403).json({
      acknowledgement: false,
      "message": "ممنوع",
      description: "کاربر مدیر کل قابل حذف نیست",
    });
  }
  
  // Soft delete user cart
  if (user.cart.length > 0) {
    await Cart.updateMany(
      { _id: { $in: user.cart } },
      { isDeleted: true, deletedAt: Date.now() }
    );
  }

  // Soft delete user favorites
  if (user.favorites.length > 0) {
    await Favorite.updateMany(
      { _id: { $in: user.favorites } },
      { isDeleted: true, deletedAt: Date.now() }
    );
  }

  // Soft delete user reviews
  if (user.reviews.length > 0) {
    await Review.updateMany(
      { _id: { $in: user.reviews } },
      { isDeleted: true, deletedAt: Date.now() }
    );
  }

  // Soft delete user purchases
  if (user.purchases.length > 0) {
    await Purchase.updateMany(
      { _id: { $in: user.purchases } },
      { isDeleted: true, deletedAt: Date.now() }
    );
  }

  // Soft delete category if exists
  if (user.category) {
    await Category.findByIdAndUpdate(user.category, {
      isDeleted: true,
      deletedAt: Date.now(),
    });

    // Soft delete products of the category
    await Product.updateMany(
      { category: user.category },
      { isDeleted: true, deletedAt: Date.now() }
    );
  }

  // Remove user from product buyers array
  await Product.updateMany(
    { buyers: user._id },
    { $pull: { buyers: user._id } }
  );

  res.status(200).json({
    acknowledgement: true,
    message: "OK",
    description: ` کاربر${user.name}'s با موفقیت حذف شد`
  });
};
