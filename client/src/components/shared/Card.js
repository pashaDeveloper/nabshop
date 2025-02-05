

"use client";

import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { MdFavorite } from "react-icons/md";
import { HeartEmpty, HeartFull } from "@/components/icons/Heart";
import Discount from "../icons/Discount";
import SoldOut from "../icons/SoldOut";
import Arrival from "../icons/Arrival";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  useAddToFavoriteMutation,
  useRemoveFromFavoriteMutation,
} from "@/services/favorite/favoriteApi";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";
import { ArrowRight } from '@/components/icons/ArrowRight'

const Card = ({ index, product, ...rest }) => {
  const router = useRouter();
  const user = useSelector((state) => state?.auth?.user);

  // check if product._id match with favorites array of object's product._id
  const favorite = user?.favorites?.find(
    (fav) => fav?.product?._id === product?._id
  );
console.log(product)
  return (
    <div
      {...rest}
      className="relative group   bg-white  rounded-2xl shadow-lg p-6  group cursor-pointer"
      onClick={() =>
        router.push(
          `/product?product_id=${
            product?._id
          }&product_title=${product?.title
            .replace(/ /g, "-")
            .toLowerCase()}}`
        )
      }

    >
       {favorite ? (
          <RemoveFromFavorite favorite={favorite} />
        ) : (
          <AddToFavorite product={product} />
        )}
<div className="absolute top-4 left-5 z-10 flex gap-2 items-center">
  {/* نمایش آیکون‌های کمپین بر اساس وضعیت محصول */}
  {product?.campaign.state==="discount" && <Discount className="w-8 h-8 text-red-500" />}
  {product?.campaign.state==="sold-out" && <SoldOut className="w-5 h-5 text-gray-500" />}
  {product?.campaign.state==="new-arrival" && <Arrival className="w-5 h-5 text-green-500" />}


</div>

       <div className="mt-4 flex justify-center">
      <div className=" bg-white rounded-full relative     opacity-15 shadow-custom  flex items-center justify-center">
      <Image
          src={product?.thumbnail?.url}
          alt={product?.thumbnail?.public_id}
          width={300}
          height={300}
          className="w-50 h-50 object-contain" />
      </div>
    </div>
       
   
  
    {/* Texts */}
    <div className="mt-6 text-right">
  <h3 className="text-3xl font-nozha truncate w-full">{product?.title}</h3>
  <p className="text-base text-gray-500 truncate w-full">{product?.summary}</p>
</div>

  
    {/* Action Button */}
    <div className="bottom-4 right-4 flex w-full items-center justify-between">
  <button className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
    <ArrowRight className="w-12 h-12 transition-transform duration-300 transform group-hover:translate-x-1 group-focus:translate-x-1" />
  </button>

  {/* محاسبه و نمایش قیمت */}
  <div className="text-left">
    {product?.variations?.[0]?.price && product?.discountAmount > 0 ? (
      <>
        {/* قیمت اصلی با خط خوردگی */}
        <p className="text-sm text-red-500 line-through">
          {new Intl.NumberFormat('fa-IR').format(product?.variations?.[0]?.price)} ریال
        </p>
        {/* قیمت نهایی با تخفیف */}
        <p className="text-lg text-green-500 font-semibold">
          {new Intl.NumberFormat('fa-IR').format(
            product?.variations?.[0]?.price * (1 - product?.discountAmount / 100)
          )} ریال
        </p>
      </>
    ) : (
      // اگر تخفیفی وجود نداشت، فقط قیمت اصلی نمایش داده شود
      <p className="text-lg text-blue-500 font-semibold">
        {product?.variations?.[0]?.price
          ? new Intl.NumberFormat('fa-IR').format(product?.variations?.[0]?.price) + " ریال"
          : "قیمتی موجود نیست"}
      </p>
    )}
  </div>
</div>

       
      
    </div>
  );
};

function Badge({ props, children, className }) {
  return (
    <span
      className={
        "px-3 py-1 rounded text-xs w-fit" + (className ? " " + className : "")
      }
      {...props}
    >
      {children}
    </span>
  );
}



function AddToFavorite({ product }) {
  const user = useSelector((state) => state?.auth?.user);
  const [addToFavorite, { isLoading, data, error }] = useAddToFavoriteMutation();

  useEffect(() => {
    if (isLoading) {
      toast.loading("اضافه کردن به علاقه‌مندی...", { id: "addToFavorite" });
    }

    if (data) {
      toast.success(data?.description, { id: "addToFavorite" });
    }

    if (error?.data) {
      toast.error(error?.data?.description, { id: "addToFavorite" });
    }
  }, [isLoading, data, error]);

  return (
    <button
      className="absolute top-4 right-5 z-10"
      onClick={(e) => {
        e.stopPropagation(); // جلوگیری از انتشار کلیک
        addToFavorite({ product: product?._id });
      }}
    >
      {isLoading ? <Spinner /> : <HeartEmpty className="w-8 h-8 text-black" />}
    </button>
  );
}

function RemoveFromFavorite({ favorite }) {
  const user = useSelector((state) => state?.auth?.user);
  const [removeFromFavorite, { isLoading, data, error }] = useRemoveFromFavoriteMutation();

  useEffect(() => {
    if (isLoading) {
      toast.loading("حذف از علاقه‌مندی...", { id: "addToFavorite" });
    }

    if (data) {
      toast.success(data?.description, { id: "addToFavorite" });
    }

    if (error?.data) {
      toast.error(error?.data?.description, { id: "addToFavorite" });
    }
  }, [isLoading, data, error]);

  return (
    <button
      className="absolute top-4 right-5 z-10"
      onClick={(e) => {
        e.stopPropagation(); // جلوگیری از انتشار کلیک
        removeFromFavorite({ id: favorite?._id });
      }}
    >
      {isLoading ? <Spinner /> : <HeartFull className="w-8 h-8" />}
    </button>
  );
}

export default Card;
