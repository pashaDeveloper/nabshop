"use client"
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

const Policies = () => {
  const policies = [
    {
      title: "ارسال رایگان",
      detail: "برای خریدهای بالای ۵۰۰ هزار تومان",
      icon: <Shipping />,
      className: "bg-red-100",
    },
    {
      title: "بازگشت آسان",
      detail: "امکان بازگشت محصول تا ۷ روز.",
      icon: <Return />,
      className: "bg-sky-100",
    },
    {
      title: "تحویل سریع",
      detail: "ارسال به سراسر کشور در کوتاه‌ترین زمان.",
      icon: <Delivery />,
      className: "bg-green-100",
    },
    {
      title: "تضمین کیفیت",
      detail: "تازه‌ترین نقل و حلوا.",
      icon: <Policy />,
      className: "bg-amber-100",
    },
  ];

  return (
    <>
      {/* نمایش در دسکتاپ */}
      <section className="hidden md:grid grid-cols-4 gap-4">
        {policies.map((policy, index) => (
          <motion.div
            key={index}
            className={`flex flex-col gap-y-3 ${policy.className} p-5 rounded-primary`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.2 }}
          >
            {policy.icon}
            <article className="flex flex-col gap-y-0.5">
              <h2 className="text-lg font-bold">{policy.title}</h2>
              <p className="text-sm text-gray-600">{policy.detail}</p>
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
                  className={`flex flex-col gap-y-3 ${policy.className} p-5 rounded-primary`}
                  initial={{ opacity: 0, x: -50 }} // ورود از سمت چپ
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {policy.icon}
                <article className="flex flex-col gap-y-0.5">
                  <h2 className="text-lg font-bold">{policy.title}</h2>
                  <p className="text-sm text-gray-600">{policy.detail}</p>
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
