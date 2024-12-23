"use client";

import React from "react";
import Down from "../icons/Down";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const pathname = usePathname();
  const user = useSelector((state) => state.auth.user);

  let routes = [];

  if (user?.role === "buyer") {
    routes = [
      {
        name: "پروفایل من",
        paths: [
          {
            name: "مشاهده پروفایل",
            path: "/dashboard/buyer/my-profile",
          },
          {
            name: "مشاهده خریدها",
            path: "/dashboard/buyer/my-purchases",
          },
        ],
      },
      {
        name: "سبد خرید من",
        paths: [
          {
            name: "مشاهده سبد خرید",
            path: "/dashboard/buyer/my-cart",
          },
          {
            name: "مشاهده لیست علاقه‌مندی‌ها",
            path: "/dashboard/buyer/my-wishlist",
          },
        ],
      },
      {
        name: "نظرات من",
        paths: [
          {
            name: "مشاهده نظرات",
            path: "/dashboard/buyer/my-reviews",
          },
        ],
      },
    ];
  }

  if (user?.role === "seller") {
    routes = [
      {
        name: "پروفایل من",
        paths: [
          {
            name: "مشاهده پروفایل",
            path: "/dashboard/seller/my-profile",
          },
        ],
      },
      {
        name: "دارایی‌های من",
        paths: [
          {
            name: "مشاهده برند",
            path: "/dashboard/seller/my-brand",
          },
          {
            name: "مشاهده دسته‌بندی",
            path: "/dashboard/seller/my-category",
          },
          {
            name: "مشاهده فروشگاه",
            path: "/dashboard/seller/my-store",
          },
        ],
      },
      {
        name: "محصولات من",
        paths: [
          {
            name: "افزودن محصول",
            path: "/dashboard/seller/add-product",
          },
          {
            name: "لیست محصولات",
            path: "/dashboard/seller/list-products",
          },
        ],
      },
    ];
  }

  if (user?.role === "admin" || user?.role === "superAdmin") {
    routes = [
      {
        name: "پروفایل من",
        paths: [
          {
            name: "مشاهده پروفایل",
            path: "/dashboard/seller/my-profile",
          },
        ],
      },
      {
        name: "دارایی‌های من",
        paths: [
          {
            name: "مشاهده برند",
            path: "/dashboard/seller/my-brand",
          },
          {
            name: "مشاهده دسته‌بندی",
            path: "/dashboard/seller/my-category",
          },
          {
            name: "مشاهده فروشگاه",
            path: "/dashboard/seller/my-store",
          },
        ],
      },
      {
        name: "محصولات من",
        paths: [
          {
            name: "افزودن محصول",
            path: "/dashboard/seller/add-product",
          },
          {
            name: "لیست محصولات",
            path: "/dashboard/seller/list-products",
          },
        ],
      },
      {
        name: "مدیریت خرده‌فروشی",
        paths: [
          {
            name: "لیست برندها",
            path: "/dashboard/admin/list-brands",
          },
          {
            name: "لیست دسته‌بندی‌ها",
            path: "/dashboard/admin/list-categories",
          },
          {
            name: "لیست فروشگاه‌ها",
            path: "/dashboard/admin/list-stores",
          },
          {
            name: "لیست محصولات",
            path: "/dashboard/admin/list-products",
          },
        ],
      },
      {
        name: "ویژگی‌های حساب",
        paths: [
          {
            name: "لیست علاقه‌مندی‌ها",
            path: "/dashboard/admin/list-favorites",
          },
          {
            name: "لیست سبدها",
            path: "/dashboard/admin/list-cart",
          },
          {
            name: "لیست خریدها",
            path: "/dashboard/admin/list-purchases",
          },
        ],
      },
      {
        name: "مدیریت کاربران",
        paths: [
          {
            name: "لیست کاربران",
            path: "/dashboard/admin/list-users",
          },
          {
            name: "درخواست‌های فروشندگان",
            path: "/dashboard/admin/seller-requests",
          },
        ],
      },
    ];
  }

  return (
    <section className="md:col-span-2 col-span-12 overflow-hidden bg-white z-50 min-w-full max-w-lg px-2 overflow-y-auto md:block hidden">
      <div className="w-full h-full flex flex-col gap-y-4">
        {routes.map((route, index) => (
          <div
            key={index}
            className="bg-slate-50/50 p-2 rounded flex flex-col gap-y-2"
          >
            <h2 className="flex flex-row justify-between items-center">
              {route.name} <Down />
            </h2>

            <div className="flex flex-col gap-y-2 text-sm p-2 bg-slate-100/50 rounded">
              {route.paths.map((path, index) => (
                <Link
                  href={path.path}
                  key={index}
                  className={
                    "p-1 rounded flex flex-row gap-x-2" +
                    " " +
                    (pathname === path.path
                      ? "bg-purple-500 text-white"
                      : "bg-slate-200/50 text-black")
                  }
                >
                  <span></span>
                  {path.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
        <Link
          href="/"
          className="text-sm bg-slate-50/50 p-2 rounded mt-auto flex flex-row gap-x-1 items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          Go to Home
        </Link>
      </div>
    </section>
  );
};

export default Sidebar;
