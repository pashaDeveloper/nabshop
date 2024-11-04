# استفاده از تصویر Node برای پروژه سرور
FROM node:18

# تنظیم مسیر کاری درون کانتینر
WORKDIR /app

# کپی فایل‌های package.json و yarn.lock
COPY package.json yarn.lock ./

# نصب وابستگی‌ها
RUN yarn install

# کپی کردن باقی فایل‌های پروژه
COPY . .

# تنظیم پورت
EXPOSE 5000

# اجرای پروژه سرور
CMD ["yarn", "start"]
