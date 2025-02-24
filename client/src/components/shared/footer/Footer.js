"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import FooterLogo from "./FooterLogo";

const Footer = () => {
  const router = useRouter();
  const year = new Date().getFullYear();

  const sitemaps = [
    {
      name: "ویژگی‌ها",
      paths: [
        {
          name: "طعم خاص",
          path: "/"
        },
        {
          name: "ویژگی‌های ممتاز",
          path: "/"
        },
        {
          name: "تیم تولید",
          path: "/"
        },
        {
          name: "کیفیت خانگی",
          path: "/"
        },
        {
          name: "تجربه متفاوت",
          path: "/"
        },
        {
          name: "اخرین ویژگی",
          path: "/"
        }
      ]
    },
    {
      name: "منابع",
      paths: [
        {
          name: "دستور تهیه",
          path: "/"
        },
        {
          name: "خواص نقل و حلوا",
          path: "/"
        },
        {
          name: "سنت‌های مرتبط",
          path: "/"
        },
        {
          name: "تاریخ نقل و حلوا",
          path: "/"
        }
      ]
    },
    {
      name: "درباره ما",
      paths: [
        {
          name: "تیم ناب",
          path: "/"
        },
        {
          name: "کارگاه‌ه تولیدی",
          path: "/"
        },
        {
          name: "حریم خصوصی",
          path: "/"
        },
        {
          name: "قوانین و مقررات",
          path: "/"
        }
      ]
    },
    {
      name: "تماس با ما",
      paths: [
        {
          name: "پشتیبانی",
          path: "/"
        },
        {
          name: "واحد فروش",
          path: "/"
        },
        {
          name: "همکاری تبلیغاتی",
          path: "/"
        }
      ]
    },
    {
      name: "قوانین",
      paths: [
        {
          name: "ثبت شکایت",
          path: "/"
        },
        {
          name: "شرایط خدمات",
          path: "/"
        },
        {
          name: "قوانین و سیاست‌ها",
          path: "/"
        }
      ]
    },
    {
      name: "ارتباط با ما",
      paths: [
        {
          name: "اینستاگرام",
          path: "https://www.instagram.com/nab/"
        },
        {
          name: "لینکدین",
          path: "https://www.linkedin.com/in/nab/"
        },
        {
          name: "گیت‌هاب",
          path: "https://github.com/nab/"
        }
      ]
    }
  ];

  return (
    <footer className="footer-1   p-4 sm:py-12 bg-lightbg dark:bg-slate-900">
      <div className="container mx-auto px-4 flex flex-col gap-y-10 bg-yellow-50 dark:bg-slate-800  p-6 rounded-xl text-gray-900 dark:text-gray-100">
        <div className="flex md:flex-row md:flex-wrap md:justify-between flex-col gap-x-4 gap-y-8">
          {sitemaps?.map((sitemap, index) => (
            <div key={index} className="flex flex-col gap-y-3">
              <h2 className="text-2xl">{sitemap.name}</h2>
              <div className="flex flex-col gap-y-1.5">
                {sitemap?.paths?.map((path, index) => (
                  <Link key={index} href={path?.path} className="text-base">
                    {path?.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div>
          <FooterLogo />{" "}
        </div>
        <hr />
        <p className="text-center">
          &copy; {year} تمامی حقوق این اثر متعلق به نقل و حلواپزی ناب می‌باشد
          <br />
          طراحی و برنامه‌نویسی توسط مجید و امیر
        </p>
      </div>
    </footer>
  );
};

export default Footer;
