

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

  return (
    <div
      {...rest}
      className="relative group cursor-pointer  bg-white w-60 h-72 rounded-2xl shadow-lg p-6"
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
       <div className="mt-4 flex justify-center">
      <div className="w-36 h-36 bg-white rounded-full relative     opacity-15 shadow-custom  flex items-center justify-center">
      <Image
          src={product?.thumbnail?.url}
          alt={product?.thumbnail?.public_id}
          width={300}
          height={300}
          className="w-full h-full object-contain" />
      </div>
    </div>
       
   
  
    {/* Texts */}
    <div className="mt-6 text-left">
      <h3 className="text-xl font-semibold">{product?.title}</h3>
      <p className="text-base text-gray-500">{product?.category?.title}</p>
      <p className="text-lg text-blue-500 font-bold">{product?.price}</p>
    </div>
  
    {/* Action Button */}
    <div className="absolute bottom-4 right-4">
      <button className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center ">
        <ArrowRight className="w-12 h-12  transition-transform duration-300 transform group-hover:translate-x-1 group-focus:translate-x-1" />
      </button>
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
  const [addToFavorite, { isLoading, data, error }] =
    useAddToFavoriteMutation();

  useEffect(() => {
    if (isLoading) {
      toast.loading("اضافه کردن به علاقه مندی...", { id: "addToFavorite" });
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
      onClick={() => addToFavorite({ product: product?._id })}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <HeartEmpty className={`w-5 h-5 text-black`} />
      )}
    </button>
  );
}

function RemoveFromFavorite({ favorite }) {
  const user = useSelector((state) => state?.auth?.user);
  const [removeFromFavorite, { isLoading, data, error }] =
    useRemoveFromFavoriteMutation();

  useEffect(() => {
    if (isLoading) {
      toast.loading("حذف از علاقه مندی...", { id: "addToFavorite" });
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
      onClick={() => removeFromFavorite({ id: favorite?._id })}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <HeartFull className={`w-5 h-5 `} />
      )}
    </button>
  );
}

export default Card;
