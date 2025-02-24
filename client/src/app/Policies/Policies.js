"use client";
import React from "react";
import { motion } from "framer-motion";
import Shipping from "@/components/icons/Shipping";
import Return from "@/components/icons/Return";
import Policy from "@/components/icons/Policy";
import Delivery from "@/components/icons/Delivery";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { Pagination, FreeMode } from "swiper/modules";

const policies = [
  {
    title: "ارسال رایگان",
    detail: "برای خریدهای بالای ۵۰۰ هزار تومان",
    icon: <Shipping />,
    className: "bg-red-100",
    darkClassName: "dark:bg-rose-600 ",
  },
  {
    title: "بازگشت آسان",
    detail: "امکان بازگشت محصول تا ۷ روز.",
    icon: <Return />,
    className: "bg-sky-100",
    darkClassName: "dark:bg-sky-600 ",
  },
  {
    title: "تحویل سریع",
    detail: "ارسال به سراسر کشور در کوتاه‌ترین زمان.",
    icon: <Delivery />,
    className: "bg-green-100",
    darkClassName: "dark:bg-green-600 ",
  },
  {
    title: "تضمین کیفیت",
    detail: "تازه‌ترین نقل و حلوا.",
    icon: <Policy />,
    className: "bg-amber-100",
    darkClassName: "dark:bg-amber-600 ",
  },
];

const Policies = () => {
  return (
    <>
      {/* نمایش در دسکتاپ */}
      <section className="hidden md:grid grid-cols-4 gap-4">
        {policies.map((policy, index) => (
          <motion.div
            key={index}
            className={`flex flex-col gap-y-3 p-5 rounded-primary 
                        ${policy.className} ${policy.darkClassName}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: index * 0.2 }}
          >
            <span className="dark:text-gray-100">{policy.icon}</span>
            <article className="flex flex-col gap-y-0.5">
              <h2 className="text-lg">{policy.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {policy.detail}
              </p>
            </article>
          </motion.div>
        ))}
      </section>

      {/* نمایش در موبایل */}
      <section className="md:hidden">
        <Swiper
          slidesPerView={1.6}
          spaceBetween={10}
          pagination={{ clickable: true }}
          freeMode={true}
          modules={[Pagination, FreeMode]}
          className="w-full h-full"
        >
          {policies.map((policy, index) => (
            <SwiperSlide key={index}>
              <motion.div
                className={`flex flex-col gap-y-3 p-5 rounded-primary 
                            ${policy.className} ${policy.darkClassName}`}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {policy.icon}
                <article className="flex flex-col gap-y-0.5">
                  <h2 className="text-lg font-bold">{policy.title}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {policy.detail}
                  </p>
                </article>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
};

export default Policies;
