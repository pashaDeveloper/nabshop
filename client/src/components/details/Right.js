"use client"
import React, { useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import CartButton from "./CartButton";
import Description from "./Description";
import Policies from "./Policies";

const Right = ({ product }) => {
  const [showCart, setShowCart] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // وقتی اسکرول به پایین میره، مخفی بشه
        setShowCart(false);
      } else {
        // وقتی اسکرول متوقف یا به بالا رفت، دوباره نمایش داده بشه
        setShowCart(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <section className="lg:col-span-6 md:col-span-6 col-span-12 flex flex-col gap-y-8">
      <article className="flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-4">
          <span className="text-xs flex items-center gap-x-1 px-2 h-full rounded">
            <AiFillStar className="w-4 h-4 text-yellow-500" />
          </span>
          <h1 className="lg:text-5xl font-nozha md:text-3xl text-4xl">
            {product?.title || "عنوان محصول"}
          </h1>
          <p className="text-justify">{product.description}</p>
        </div>
        {/* در حالت موبایل مخفی می‌شود */}
        <div className="hidden md:block">
          <CartButton product={product} />
        </div>
      </article>

      <Description product={product} />
      <Policies />

      {/* CartButton به‌عنوان Bottom Sheet در موبایل */}
      <div
        className={`fixed z-[99999] -bottom-24 left-0 w-full  shadow-lg  transition-transform duration-300 md:hidden ${
          showCart ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <CartButton product={product} />
      </div>
    </section>
  );
};

export default Right;
