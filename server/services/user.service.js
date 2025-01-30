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
  const { name, email, password, phone ,avatarUrl} = body; 

  if (!name || !email || !password || !phone) {
    return res.status(400).json({
      acknowledgement: false,
      message: "درخواست نادرست",
      description: "همه فیلدها الزامی است",
      isSuccess: false,
    });
  }

  const existingUser = await User.findOne({
    $or: [{ email: email }, { phone: phone }],
  });
if (existingUser) {
    return {
        success: false,
        message: "کاربری با این ایمیل یا شماره تلفن قبلاً ثبت‌نام کرده است. لطفاً به صفحه ورود بروید.",
        redirectToLogin: true,
    };
}


if (req.uploadedFiles && req.uploadedFiles["avatar"] && req.uploadedFiles["avatar"].length > 0) {
  avatar = {
      url: req.uploadedFiles["avatar"][0].url,
      public_id: req.uploadedFiles["avatar"][0].key,
  }
}else{
  avatar = {
    url: avatarUrl,
    public_id: null,
}
}
  const userCount = await User.countDocuments();
  const role = userCount === 0 ? "superAdmin" : "buyer";
  const status = userCount === 0 ? "active" : "inactive";

  const user = new User({
    name: body.name,
    email: body.email,
    password: body.password,
    phone: body.phone,
    role:role,
    status:status,
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
console.log('user',user)
  if (!user) {
    res.status(404).json({
      acknowledgement: false,
      message: "Not Found",
      description: "کاربر یافت نشد",
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
        description: "رمز عبور صحیح نیست",
      });
    } else {
      if (user.status === "inactive") {
        res.status(401).json({
          acknowledgement: false,
          message: "Unauthorized",
          description: "Your seller account in a review state",
        });
      } else {
        const accessToken = token({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
        });

        res.status(200).json({
          acknowledgement: true,
          message: "OK",
          description: "Login successful",
          accessToken,
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
      description: "کاربر یافت نشد",
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
      description: "Password reset successful",
    });
  }
};

/* login persistance */
exports.persistLogin = async (req, res) => {
  
  const user = await User.findById(req.user._id).populate([
    {
      path: "cart",
      populate: [
        { path: "product", populate: [ "category"] },
        "user",
      ],
    },
    {
      path: "reviews",
      populate: ["product", "reviewer"],
    },
    {
      path: "favorites",
      populate: [
        {
          path: "product",
          populate: ["category"],
        },
        "user",
      ],
    },
    {
      path: "purchases",
      populate: ["customer", "products.product"],
    },
    "products",
  ]);

  if (!user) {
    res.status(404).json({
      acknowledgement: false,
      message: "Not Found",
      description: "کاربر یافت نشد",
    });
  } else {
    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "ورود با موفقیت انجام شد",
      data: user,
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
    data: users,
  });
};

/* get single user */
exports.getUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    acknowledgement: true,
    message: "OK",
    description: `اطلاعات کاربر${user.name}' با موفقیت دریافت شد`,
    data: user,
  });
};

/* update user information */
exports.updateUser = async (req, res) => {
  const existingUser = await User.findById(req.user._id);
  const user = req.body;
  if (!req.body.avatar && req.file) {
    await remove(existingUser.avatar?.public_id);

    user.avatar = {
      url: req.file.path,
      public_id: req.file.filename,
    };
  }

  const updatedUser = await User.findByIdAndUpdate(
    existingUser._id,
    { $set: user },
    {
      runValidators: true,
    }
  );

  res.status(200).json({
    acknowledgement: true,
    message: "OK",
    description: `${updatedUser.name}'s information updated successfully`,
  });
};

/* update user information */
exports.updateUserInfo = async (req, res) => {
  const existingUser = await User.findById(req.params.id);
  const user = req.body;

  if (!req.body.avatar && req.file) {
    await remove(existingUser.avatar?.public_id);

    user.avatar = {
      url: req.file.path,
      public_id: req.file.filename,
    };
  }

  const updatedUser = await User.findByIdAndUpdate(
    existingUser._id,
    { $set: user },
    {
      runValidators: true,
    }
  );

  res.status(200).json({
    acknowledgement: true,
    message: "OK",
    description: `${updatedUser.name}'s information updated successfully`,
  });
};

/* delete user information */
exports.deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  // remove user avatar
  await remove(user.avatar?.public_id);

  // remove user cart
  if (user.cart.length > 0) {
    user.cart.forEach(async (cart) => {
      await Cart.findByIdAndDelete(cart._id);
    });
  }

  // remove user favorites
  if (user.favorites.length > 0) {
    user.favorites.forEach(async (favorite) => {
      await Favorite.findByIdAndDelete(favorite._id);
    });
  }

  // remove user reviews
  if (user.reviews.length > 0) {
    user.reviews.forEach(async (review) => {
      await Review.findByIdAndDelete(review._id);
    });
  }

  // remove user purchases
  if (user.purchases.length > 0) {
    user.purchases.forEach(async (purchase) => {
      await Purchase.findByIdAndDelete(purchase._id);
    });
  }

  // remove store
  if (user.store) {
    const store = await Store.findByIdAndDelete(user.store);

    // remove store thumbnail
    await remove(store?.thumbnail?.public_id);

    // remove store products
    store.products.forEach(async (prod) => {
      const product = await Product.findByIdAndDelete(prod);

      // remove product thumbnail
      await remove(product?.thumbnail?.public_id);

      // remove product gallery
      product.gallery.forEach(async (gallery) => {
        await remove(gallery?.public_id);
      });

      // remove product reviews
      product.reviews.forEach(async (review) => {
        await Review.findByIdAndDelete(review._id);
      });
    });
  }

  // remove category
  if (user.category) {
    const category = await Category.findByIdAndDelete(user.category);

    // remove category thumbnail
    await remove(category?.thumbnail?.public_id);

    // remove category products
    category.products.forEach(async (prod) => {
      const product = await Product.findByIdAndDelete(prod);

      // remove product thumbnail
      await remove(product?.thumbnail?.public_id);

      // remove product gallery
      product.gallery.forEach(async (gallery) => {
        await remove(gallery?.public_id);
      });

      // remove product reviews
      product.reviews.forEach(async (review) => {
        await Review.findByIdAndDelete(review._id);
      });
    });
  }

  // remove brand
  if (user.brand) {
    const brand = await Brand.findByIdAndDelete(user.brand);

    // remove brand logo
    await remove(brand?.logo?.public_id);

    // remove brand products
    brand.products.forEach(async (prod) => {
      const product = await Product.findByIdAndDelete(prod);

      // remove product thumbnail
      await remove(product?.thumbnail?.public_id);

      // remove product gallery
      product.gallery.forEach(async (gallery) => {
        await remove(gallery?.public_id);
      });

      // remove product reviews
      product.reviews.forEach(async (review) => {
        await Review.findByIdAndDelete(review._id);
      });
    });
  }

  // remove user from product's buyers array
  if (user.products.length > 0) {
    await Product.updateMany(
      {},
      {
        $pull: {
          buyers: user._id,
        },
      }
    );
  }

  res.status(200).json({
    acknowledgement: true,
    message: "OK",
    description: `${user.name}'s information deleted successfully`,
  });
};

// seller request & approve
exports.getSellers = async (res) => {
  const users = await User.find({ role: "seller", status: "inactive" }).populate(["brand", "category", "store"]);

  res.status(200).json({
    acknowledgement: true,
    message: "OK",
    description: "Sellers retrieved successfully",
    data: users,
  });
};

exports.reviewSeller = async (req, res) => {
  await User.findByIdAndUpdate(req.query.id, {
    $set: req.body,
  });

  res.status(200).json({
    acknowledgement: true,
    message: "OK",
    description: "Seller reviewed successfully",
  });
};
