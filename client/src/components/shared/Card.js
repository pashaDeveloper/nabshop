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
  useRemoveFromFavoriteMutation
} from "@/services/favorite/favoriteApi";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";
import { ArrowRight } from "@/components/icons/ArrowRight";
import Link from "next/link";

const Card = ({ index, product, ...rest }) => {
  const user = useSelector((state) => state?.auth?.user);
  const [loading, setLoading] = useState(false); 
  
  const favorite = user?.favorites?.find(
    (fav) => fav?.product?._id === product?._id
  );

  return (
    <div className="relative group mb-8 bg-white dark:bg-darkCard rounded-2xl shadow-lg group cursor-pointer">
      <Link
        href={`/products/${product?._id}`}
        passHref
        onClick={(e) => {
          e.stopPropagation();
          setLoading(true); 
        }}
        onTouchStart={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {favorite ? (
            <RemoveFromFavorite favorite={favorite} />
          ) : (
            <AddToFavorite product={product} />
          )}
          
          {/* نمایش آیکون‌های کمپین */}
          <div className="absolute top-4 left-5 z-10 flex gap-2 items-center">
            {product?.campaign.state === "discount" && (
              <Discount className="w-8 h-8 text-red-500" />
            )}
            {product?.campaign.state === "sold-out" && (
              <SoldOut className="w-5 h-5 text-gray-500" />
            )}
            {product?.campaign.state === "new-arrival" && (
              <Arrival className="w-5 h-5 text-green-500" />
            )}
          </div>

          {/* تصویر محصول */}
          <div className="mt-4 flex justify-center">
            <div className="rounded-full relative opacity-15 shadow-custom flex items-center justify-center">
              <Image
                src={product?.thumbnail?.url}
                alt={product?.thumbnail?.public_id}
                width={300}
                height={300}
                className="w-50 h-50 object-contain"
              />
            </div>
          </div>

          {/* اطلاعات محصول */}
          <div className="mt-6 text-right">
            <h3 className="text-3xl font-nozha truncate w-full">
              {product?.title}
            </h3>
            <p className="text-base text-gray-500 truncate w-full">
              {product?.summary}
            </p>
          </div>

          {/* دکمه حرکت و قیمت */}
          <div className="bottom-4 right-4 flex w-full items-center justify-between">
            {/* 🔹 دکمه که هنگام کلیک، Spinner نمایش می‌دهد */}
            <button
              className="w-12 h-12 bg-white dark:bg-black rounded-full shadow-lg flex items-center dark:text-gray-100 justify-center"
              aria-label="دیدن جزئیات محصول"
            >
              {loading ? (
                <Spinner className="w-6 h-6" /> // 🔹 نمایش اسپینر هنگام لودینگ
              ) : (
                <ArrowRight className="w-12 h-12 transition-transform duration-300 transform group-hover:translate-x-1 group-focus:translate-x-1" />
              )}
            </button>

            {/* قیمت محصول */}
            <div className="text-left">
              {product?.variations?.[0]?.price && product?.discountAmount > 0 ? (
                <>
                  <p className="text-sm text-red-500 line-through">
                    {new Intl.NumberFormat("fa-IR").format(
                      product?.variations?.[0]?.price
                    )}{" "}
                    ریال
                  </p>
                  <p className="text-lg text-green-500">
                    {new Intl.NumberFormat("fa-IR").format(
                      product?.variations?.[0]?.price *
                        (1 - product?.discountAmount / 100)
                    )}{" "}
                    ریال
                  </p>
                </>
              ) : (
                <p className="text-lg text-blue-500">
                  {product?.variations?.[0]?.price
                    ? new Intl.NumberFormat("fa-IR").format(
                        product?.variations?.[0]?.price
                      ) + " ریال"
                    : "قیمتی موجود نیست"}
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};


function AddToFavorite({ product }) {
  const user = useSelector((state) => state?.auth?.user);
  const [addToFavorite, { isLoading, data, error }] =
    useAddToFavoriteMutation();

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
      aria-label="افزودن به علاقه مندی "
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
  const [removeFromFavorite, { isLoading, data, error }] =
    useRemoveFromFavoriteMutation();

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
      aria-label="حذف از علاقه مندی"
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
