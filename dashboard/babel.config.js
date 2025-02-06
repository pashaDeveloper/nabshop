module.exports = {
    compact: false, // این بهینه‌سازی‌ها را برای فایل‌های بزرگ غیرفعال می‌کند
    overrides: [
      {
        test: "./src/components/shared/editor/ckeditor/build/ckeditor.jsx",  // مسیر فایل CKEditor
        compact: true, // بهینه‌سازی را فقط برای این فایل فعال می‌کند
      },
    ],
  };
  