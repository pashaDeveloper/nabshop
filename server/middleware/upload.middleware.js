const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");

const getStorage = (folderName) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      const date = new Date();
      const monthFolder = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;
      const fullPath = path.join("uploads", folderName, monthFolder);
      req.monthFolder = monthFolder;
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
      }

      cb(null, fullPath);
    },
    filename: (req, file, cb) => {
      const hashedName = crypto.randomBytes(16).toString("hex");
      const extension = path.extname(file.originalname);
      const uniqueSuffix = `${hashedName}${extension}`;
      
      // نام نهایی فایل
      const filename = uniqueSuffix;
      
      // مسیر نسبی برای دسترسی به فایل، استفاده از req.monthFolder
      req.body.filePath = path.join("uploads", folderName, req.monthFolder, filename).replace(/\\/g, "/");
      cb(null, filename);
    },
  });
};


const upload = (folderName) =>
  multer({
    storage: getStorage(folderName),
    fileFilter: (_, file, cb) => {
      const supportedImage = /jpg|png|jpeg/i;
      const extension = path.extname(file.originalname);

      if (supportedImage.test(extension)) {
        cb(null, true);
      } else {
        cb(new Error("فرمت فایل باید png/jpg/jpeg باشد"));
      }
    },
  });

module.exports = upload;
