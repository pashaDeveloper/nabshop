const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // مسیر پوشه محلی
  },
  filename: (req, file, cb) => {
    const hashedName = crypto.randomBytes(16).toString('hex'); 
    const uniqueSuffix = `${Date.now()}_${hashedName}`;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (_, file, cb) => {
    const supportedImage = /jpg|png|jpeg/i;
    const extension = path.extname(file.originalname);

    if (supportedImage.test(extension)) {
      cb(null, true);
    } else {
      cb(new Error("Must be a png/jpg/jpeg formate"));
    }
  },
});

module.exports = upload;
