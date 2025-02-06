

/* internal import */
const Post = require("../models/post.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");
const remove = require("../utils/remove.util");

/* add new post */
exports.addPost = async (req, res) => {
  const { title,description,category,value} = req.body;
  console.log(req.body)
  const post = new Post({
    title: title,
    description: description,
    category:category,
    value: value,
    creator: req.user._id
  });

  const result = await post.save();

  await User.findByIdAndUpdate(result.creator, {
    $set: { post: result._id },
  });

  res.status(201).json({
    acknowledgement: true,
    message: "Created",
    description: "واحد  با موفقیت ایجاد شد",
  });
};

/* get all posts */
exports.getPosts = async (res) => {

  const posts = await Post.find().populate([
    "creator",
  ]);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "واحد ها با موفقیت دریافت شدند",
    data: posts,
  });
};

/* get a post */
exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Post fetched successfully",
    data: post,
  });
};

/* update post */
exports.updatePost = async (req, res) => {
  let updatedPost = req.body;
  await Post.findByIdAndUpdate(req.params.id, updatedPost);
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Post updated successfully",
  });
};

/* delete post */
exports.deletePost = async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  await remove(post.logo.public_id);

  await Product.updateMany({ post: req.params.id }, { $unset: { post: "" } });
  await User.findByIdAndUpdate(post.creator, {
    $unset: { post: "" },
  });

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Post deleted successfully",
  });
};
