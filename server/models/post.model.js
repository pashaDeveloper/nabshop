const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Tag = require("./tag.model");
const Category = require("./category.model");
const Counter = require("./counter")
const baseSchema = require("./baseSchema.model");

const socialLinkSchema =  new mongoose.Schema({
  name: {
    type: String,
    required: [true, "نام شبکه اجتماعی الزامی است"],
    trim: true,
    enum: {
      values: ["Facebook", "Twitter", "LinkedIn", "Instagram", "Other"],
      message: "نام شبکه اجتماعی معتبر نیست",
    },
  },
  url: {
    type: String,
    required: [true, "لینک شبکه اجتماعی الزامی است"],
    trim: true,
    match: [
      /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/,
      "لینک شبکه اجتماعی معتبر نیست",
    ],
  },
});

const postSchema =  new mongoose.Schema(
  {
    postId: {
      type: Number,
      unique: true,
    },
    title: {
      type: String,
      required: [true, "عنوان پست الزامی است"],
      trim: true,
      minLength: [3, "عنوان پست باید حداقل ۳ کاراکتر باشد"],
      maxLength: [100, "عنوان پست نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد"],
    },
    slug: {
      type: String,
      unique: true,
      required: false,
      default: function () {
        return this.title
          .toString()
          .trim()
          .toLowerCase()
          .replace(/[\u200B-\u200D\uFEFF]/g, "")
          .replace(/[\s\ـ]+/g, "-")
          .replace(/[^\u0600-\u06FFa-z0-9\-]/g, "")
          .replace(/-+/g, "-")
          .replace(/^-+|-+$/g, "");
      },
    },
    description: {
      type: String,
      maxLength: [300, "توضیحات نمی‌تواند بیشتر از ۳۰۰ کاراکتر باشد"],
      required: [true, "توضیحات الزامی است"],
    },
    featuredImage: {
      url: {
        type: String,
        required: [true, "عکس شاخص الزامی است"],
      },
      type: {
        type: String,
        enum: ["image", "video","unknown"],
        required: true,
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
            default: "https://placehold.co/296x200.png",
        
          },
          type: {
            type: String,
            enum: ["image", "video","unknown"],
            required: true,
          },
          public_id: {
            type: String,
            default: "N/A",
          },
        },
      ],
    },
    content: {
      type: String,
      required: [true, "محتوا الزامی است"],
    },
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
    readTime: {
      type: String,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
    relatedPosts: [
      {
        type: ObjectId,
        ref: "Post",
      },
    ],
    relatedMagzine: [
      {
        type: ObjectId,
        ref: "Magzine",
      },
    ],
    relatedEvents: [
      {
        type: ObjectId,
        ref: "Event",
      },
    ],
 
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
    publishDate: {
      type: Date,
    },
    publishStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      required: [true, "وضعیت انتشار الزامی است"],
    },
    tags: [
      {
        type: ObjectId,
        ref: "Tag",
        required: [true, "تگ پست الزامی است"],
      },
    ],
    category: {
      type: ObjectId,
      ref: "Category",
      required: [true, "دسته‌بندی پست الزامی است"],
    },
    creator: {
      type: ObjectId,
      ref: "User",
      required: [true, "شناسه نویسنده الزامی است"],
    },
    bookmarkedBy: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    likes: [
      {
        type: ObjectId,
        ref: "like", 
      },
    ],
    dislikes: [
      {
        type: ObjectId,
        ref: "like",
      },
    ],
    comments: [
      {
        type: ObjectId,
        ref: "Comment", 
      },
    ],
    views: {
      type: Number,
      default: 0,
      min: [0, "تعداد بازدید نمی‌تواند منفی باشد"],
    },
    socialLinks: {
      type: [socialLinkSchema],
      default: [],
    },
    ...baseSchema.obj,
  },
  { timestamps: true }
);

postSchema.virtual('likeCount').get(function() {
  return this.likes ? this.likes.length : 0;
});

postSchema.virtual('dislikeCount').get(function() {
  return this.dislikes ? this.dislikes.length : 0;
});

postSchema.virtual('rating').get(function() {
  const totalReactions = this.likes.length + this.dislikes.length;
  if (totalReactions === 0) return 0;

  const likeRatio = this.likes.length / totalReactions;
  return Math.round((likeRatio * 5 + Number.EPSILON) * 100) / 100; 
});

const defaultDomain = process.env.NEXT_PUBLIC_CLIENT_URL;


postSchema.pre("save", async function (next) {
  if (this.isNew) {
    this.postId = await getNextSequenceValue("postId");
  }

  if (!this.canonicalUrl) {
    const slugPart = this.slug ? this.slug : encodeURIComponent(this.title);
    this.canonicalUrl = `${defaultDomain}/post/${slugPart}/${encodeURIComponent(this._id)}`;
  }

  if (
    this.isModified("title") ||
    this.isModified("category") ||
    !this.metaTitle ||
    !this.metaDescription ||
    !this.metaKeywords || 
    this.metaKeywords.length === 0
  ) {
    try {
      const category = await Category.findById(this.category);
      const categoryTitle = category ? category.title : "عمومی";
      const summaryText = this.summary ? this.summary : this.description || "";

      // تولید متا تایتل
      let combinedMetaTitle = `${this.title} | ${categoryTitle}`;
      if (combinedMetaTitle.length > 60) {
        combinedMetaTitle = combinedMetaTitle.substring(0, 57) + "...";
      }
      this.metaTitle = combinedMetaTitle;

      // تولید متا دیسکریپشن
      let combinedMetaDescription = `${summaryText} | ${categoryTitle}`;
      if (combinedMetaDescription.length > 160) {
        combinedMetaDescription = combinedMetaDescription.substring(0, 157) + "...";
      }
      this.metaDescription = combinedMetaDescription;

      // تنظیم کلمات کلیدی
      const tags = Array.isArray(this.tags) ? await Tag.find({ _id: { $in: this.tags } }) : [];
      this.metaKeywords = tags.length ? tags.map(tag => tag.title).slice(0, 10) : [];
      
    } catch (error) {
      console.error("خطا در تنظیم metaTitle، metaDescription و metaKeywords:", error);
    }
  }

  next();
});

postSchema.set("toJSON", { virtuals: true });
postSchema.set("toObject", { virtuals: true });

const Post = mongoose.model("Post", postSchema);

module.exports = Post;



