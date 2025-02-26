
const Category = require("../models/category.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");
const remove = require("../utils/remove.util");

/* add new category */
exports.addCategory = async (req, res) => {
  const { body } = req;
  
  const thumbnail = req.uploadedFiles["thumbnail"] ? {
    url: req.uploadedFiles["thumbnail"][0].url,
    public_id: req.uploadedFiles["thumbnail"][0].key,
  } : null;

  const category = new Category({
    title: body.title,
    description: body.description,
    thumbnail: thumbnail,
    keynotes: JSON.parse(body.keynotes),
    tags: JSON.parse(body.tags),
    creator: req.user._id,
  });

  const result = await category.save();

  await User.findByIdAndUpdate(result.creator, {
    $set: {
      category: result._id,
    },
  });

  res.status(201).json({
    acknowledgement: true,
    message: "Created",
    description: "دسته بندی با موفقیت ایجاد شد",
  });
};
/* get all categories */
exports.getCategories = async (res) => {
  const categories = await Category.find()
  .populate({
    path: "products",
    select: "_id",
  })
  .populate({
    path: "creator",
    select: "name avatar", // دریافت نام و آواتار سازنده
  });
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "دسته بندی ها با موفقیت دریافت شدند",
    data: categories,
  });
};




exports.getProductCategories = async (res) => {
  const categories = await Category.find().populate({
    path: "products",
    match: { isDeleted: false, status: "active" ,publishStatus:"approved"},
    select: "_id",
  });
  const filteredCategories = categories.filter(category => category.products.length > 0);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "دسته بندی ها با موفقیت دریافت شدند",
    data: filteredCategories,
  });
};
/* get a category */
exports.getCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Category fetched successfully",
    data: category,
  });
};

/* update category */
exports.updateCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  let updatedCategory = req.body;
  if (!req.body.thumbnail && req.file) {
    await remove(category.thumbnail.public_id);

    updatedCategory.thumbnail = {
      url: req.file.path,
      public_id: req.file.filename,
    };
  }

  updatedCategory.keynotes = JSON.parse(req.body.keynotes);
  updatedCategory.tags = JSON.parse(req.body.tags);

  await Category.findByIdAndUpdate(req.params.id, updatedCategory);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Category updated successfully",
  });
};

/* delete category */
exports.deleteCategory = async (req, res, next) => {

  const category = await Category.findByIdAndUpdate(req.params.id,
    {
      isDeleted: true,
      deletedAt: Date.now(),
    },
    { new: true }
  );
    
  if (!category) {
    return res.status(404).json({
      acknowledgement: false,
      message: "دسته بندی پیدا نشد",
      description: "دسته بندی  که می‌خواهید حذف کنید، وجود ندارد",
    });
  }

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "دسته بندی با موفقیت حذف شد",
  });
};
