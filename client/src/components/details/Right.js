import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import CartButton from "./CartButton";
import Description from "./Description";
import Policies from "./Policies";

const Right = ({ product }) => {
  // انتخاب واحد محصول به طور پیش‌فرض
  const [selectedUnit, setSelectedUnit] = useState(product?.variations?.[0]);
  
  // تغییر واحد زمانی که کاربر روی دکمه کلیک می‌کند
  const handleUnitClick = (unit) => {
    setSelectedUnit(unit);
  };
console.log(product)
  const originalPrice = selectedUnit?.price || 0;
  const discountedPrice = product?.discountAmount > 0
    ? originalPrice * (1 - product.discountAmount / 100)
    : originalPrice;
  return (
    <section className="lg:col-span-6 md:col-span-6 col-span-12 flex flex-col gap-y-8">
       <article className="flex flex-col gap-y-8">
         <div className="flex flex-col gap-y-4">
          <h1 className="lg:text-5xl md:text-3xl text-xl">{product?.title || "عنوان محصول"}</h1>

          <div className="flex mt-8 flex-wrap gap-4 mb-4 items-center">
  {[...(product?.variations || [])]
    .sort((a, b) => Number(a.unit.value) - Number(b.unit.value))
    .map((variation) => (
      <div key={variation?._id} className="relative">
        <button
          onClick={() => handleUnitClick(variation)}
          className={`relative rounded-full flex items-center justify-center text-xl transition-all duration-300 ease-in-out
            ${selectedUnit?.unit._id === variation.unit._id ? 
              'bg-[#673DE6] outline-none ring-2 ring-[#673DE6] dark:ring-green-300 ring-offset-4 dark:ring-offset-gray-800' 
              : 'bg-red-300'}`}
          style={{
            width: `${20 + variation.unit.value * 10}px`,
            height: `${20 + variation.unit.value * 10}px`
          }}
        >
          {/* Tooltip */}
          <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-[#8C85FF] text-white text-sm rounded shadow-lg transition-opacity duration-300  whitespace-nowrap
            ${selectedUnit?.unit._id === variation.unit._id ? "opacity-100 visible" : "opacity-0 invisible group-hover:opacity-100 group-hover:visible"}`}
          >
            {variation?.unit?.title}
            {/* فلش Tooltip */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full border-8 border-transparent border-b-[#8C85FF]"></div>
          </div>
        </button>
      </div>
    ))}
</div>





          <div>
  {discountedPrice < originalPrice && (
    <span className="text-red-500 block line-through text-sm">
      {originalPrice.toLocaleString("fa-IR")} ریال
    </span>
  )}

  <span className="text-green-500 block mt-4 text-lg !leading-none">
    {discountedPrice > 0
      ? `${discountedPrice.toLocaleString("fa-IR")} ریال`
      : `${originalPrice.toLocaleString("fa-IR")} ریال`}
  </span>
</div>
          <span className="text-xs flex items-center gap-x-1 px-2 h-full bg-zinc-50 rounded">
            <AiFillStar className="w-4 h-4 text-yellow-500" /> {product?.reviews?.length || 0}
          </span>
        </div>
        <CartButton product={product} /> 
      </article> 

       <Description product={product} />
       <Policies /> 
    </section>
  );
};

export default Right;
