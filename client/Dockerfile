# استفاده از تصویر Node برای پروژه کلاینت
FROM node:18

# تنظیم مسیر کاری درون کانتینر
WORKDIR /app

# کپی فایل‌های package.json و yarn.lock
COPY package.json yarn.lock ./

# نصب وابستگی‌ها
RUN yarn install

# کپی کردن باقی فایل‌های پروژه
COPY . .

# ساختن پروژه کلاینت
RUN yarn build

# تنظیم پورت
EXPOSE 3000

# اجرای پروژه کلاینت
CMD ["yarn", "start"]
