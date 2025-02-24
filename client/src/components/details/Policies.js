

import React from "react";
import Shipping from "../icons/Shipping";
import Return from "../icons/Return";
import Delivery from "../icons/Delivery";
import Policy from "../icons/Policy";

const Policies = () => {
  const policies = [
    {
      title: "ارسال رایگان",
      detail: "برای خریدهای بالای ۵۰۰ هزار تومان",
      icon: <Shipping />,
      className: "bg-red-50 dark:bg-rose-600",
    },
    {
      title: "بازگشت آسان",
      detail: "امکان بازگشت محصول تا ۷ روز.",
      icon: <Return />,
      className: "bg-sky-50 dark:bg-sky-600",
    },
    {
      title: "تحویل سریع",
      detail: "ارسال به سراسر کشور در کوتاه‌ترین زمان.",
      icon: <Delivery />,
      className: "bg-green-50 dark:bg-green-600",
    },
    {
      title: "تضمین کیفیت",
      detail: "تازه‌ترین نقل و حلوا.",
      icon: <Policy />,
      className: "bg-amber-50 dark:bg-amber-600",
    },
    
  ];

  return (
    <section className="grid md:grid-cols-2 grid-cols-1 gap-4">
      {policies.map((policy, index) => (
        <div
          key={index}
          className={`flex flex-col gap-y-3 ${policy.className} p-5 rounded-primary`}
        >
          {policy.icon}
          <article className="flex flex-col gap-y-0.5">
            <h2 className="text-lg">{policy.title}</h2>
            <p className="text-sm dark:text-gray-100">{policy.detail}</p>
          </article>  
        </div>
      ))}
    </section>
  );
};

export default Policies;
