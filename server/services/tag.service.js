

/* internal import */
const Tag = require("../models/tag.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");
const remove = require("../utils/remove.util");

/* add new tag */
exports.addTag = async (req, res) => {
  const { body } = req;
  const parsedRobots = JSON.parse(body.robots);
  const robotsArray = parsedRobots.map((value, index) => ({
    id: index + 1, 
    value,
  }));
  const tag = new Tag({
    title: body.title,
    description: body.description,
    keynotes: JSON.parse(body.keynotes),
    creator: req.user._id,
    robots: robotsArray,
  });

  const result = await tag.save();

  await User.findByIdAndUpdate(result.creator, {
    $set: { tag: result._id },
  });

  res.status(201).json({
    acknowledgement: true,
    message: "Created",
    description: "Tag created successfully",
  });
};

/* get all tags */
exports.getTags = async (res) => {

  const tags = await Tag.find().populate([
    "creator",
  ]);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "تگ ها با موفقیت دریافت شدند",
    data: tags,
  });
};

/* get a tag */
exports.getTag = async (req, res) => {
  const tag = await Tag.findById(req.params.id);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Tag fetched successfully",
    data: tag,
  });
};

/* update tag */
exports.updateTag = async (req, res) => {
  let updatedTag = req.body;
  const parsedRobots = JSON.parse(req.body.robots);
  console.log(updatedTag)
  const robotsArray = parsedRobots.map((value, index) => ({
    id: index + 1, 
    value,
  }));


  updatedTag.keynotes = JSON.parse(req.body.keynotes);
  updatedTag.robots = robotsArray;
  console.log(updatedTag)
  await Tag.findByIdAndUpdate(req.params.id, updatedTag);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Tag updated successfully",
  });
};

/* delete tag */
exports.deleteTag = async (req, res) => {
  const tag = await Tag.findByIdAndDelete(req.params.id);
  await remove(tag.logo.public_id);

  await Product.updateMany({ tag: req.params.id }, { $unset: { tag: "" } });
  await User.findByIdAndUpdate(tag.creator, {
    $unset: { tag: "" },
  });

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Tag deleted successfully",
  });
};
