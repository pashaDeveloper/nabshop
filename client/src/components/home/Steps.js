

import Image from "next/image";
import React from "react";
import Container from "../shared/Container";
import Search from "@/components/icons/Duotone/Search"
import Delivary from "@/components/icons/Duotone/Delivary"
import Badge from "@/components/icons/Duotone/Badge"
import Obtained from "@/components/icons/Duotone/Obtained"
const Steps = () => {
  const steps = [
    {
      id: 1,
      badge: (
        <span className="inline-flex px-2.5 py-1 rounded-secondary text-xs text-red-800 bg-red-100 relative">
          مرحله 1
        </span>
      ),
      title: "🔍 جستجو  ⚙️ فیلتر  ✅",
      description: "فیلترینگ هوشمند و جستجوی سریع همراه با  رابط کاربری آسان ",
      icon: <Search />,
    },
    {
      id: 2,
      badge: (
        <span className="inline-flex px-2.5 py-1 rounded-secondary text-xs text-indigo-800 bg-indigo-100 relative">
          مرحله 2
        </span>
      ),
      title: "➕ اضافه به سبد خرید🛍️",
      description: "انتخاب آسان اقلام صحیح و افزودن آن‌ها به سبد خرید",
      icon: <Badge />,    },
    {
      id: 3,
      badge: (
        <span className="inline-flex px-2.5 py-1 rounded-secondary text-xs text-yellow-800 bg-yellow-100 relative">
          مرحله 3
        </span>
      ),
      title: "🏍️💨 ارسال سریع 🚚",
      description: " ارسال  به اورمیه با پیک سریع و رایگان  پست شهرهای دیگر ",
      icon: <Delivary />,    },
    {
      id: 4,
      badge: (
        <span className="inline-flex px-2.5 py-1 rounded-secondary text-xs text-purple-800 bg-purple-100 relative">
          مرحله 4
        </span>
      ),
      title: "✨ از محصول لذت ببرید 🎉",
      description: "از محصولات با کیفیت  لذت ببرید و تجربه خود را با ما به اشتراک بگذارید",
      icon: <Obtained />,    }
    
  ];

  return (
    <Container>
<div className="relative grid grid-cols-2 lg:grid-cols-4 gap-2 xl:gap-20 grid-flow-row rtl">
  <picture className="hidden md:block absolute inset-x-0 top-5">
    <source srcSet="/assets/home/steps/step-bg.svg" type="image/svg" />
    <img src="/assets/home/steps/step-bg.svg" alt="vector" />
  </picture>
  {steps.map((step) => (
    <div
    key={step.id}
    className="relative w-full bg-white p-4 rounded-primary shadow-lg flex flex-col md:gap-y-8 gap-y-2  items-center max-w-xs mx-auto"
    >
      <div className="max-w-[100px] mx-auto">
  {step.icon}
      </div>
      <div className="flex flex-col gap-y-4 items-center justify-center">
        {step.badge}
        <h2 className="md:text-base text-xs ">{step.title}</h2>
        <span className="md:block hidden text-slate-600 dark:text-slate-400 text-sm leading-6 text-center">
          {step.description}
        </span>
      </div>
    </div>
  ))}
</div>

    </Container>
  );
};

export default Steps;
