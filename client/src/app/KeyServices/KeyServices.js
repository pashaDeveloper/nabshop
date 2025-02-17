import React from "react";
// import { Marriege, Investment, Passport, Legal, Building, Tourism } from "@/utils/SaveIcon";

const KeyServices  = () => {
  const steps = [
    {
      id: 1,
      title: "ازدواج بین المللی",
      // icon: <Marriege aria-label="آیکون ازدواج بین المللی" />,
    },
    {
      id: 2,
      title: "سرمایه گذاری",
      // icon: <Investment aria-label="آیکون سرمایه گذاری" />,
    },
    {
      id: 3,
      title: "اخذ ویزا و اقامت",
      // icon: <Passport aria-label="آیکون اخذ ویزا و اقامت" />,
    },
    {
      id: 4,
      title: "امور وکالتی و اداری",
      // icon: <Legal aria-label="آیکون امور وکالتی و اداری" />,
    },
    {
      id: 5,
      title: "خرید ملک و مسکن",
      // icon: <Building aria-label="آیکون خرید ملک و مسکن" />,
    },
    {
      id: 6,
      title: "تفریحی و گردشگری",
      // icon: <Tourism  />,
    },
  ];

  return (
    <div className="relative grid grid-cols-2 mt-8 lg:grid-cols-6 gap-5 sm:gap-16 xl:gap-10">
       <picture className="hidden md:block absolute inset-x-0 top-5">
          <source srcSet="/assets/home/steps/step-bg.svg" type="image/svg" />
          <img src="/assets/steps/step-bg.svg" alt="vector" />
        </picture>
     
    </div>
  );
};

export default KeyServices ;
