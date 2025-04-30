"use client";

import React, { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Bag from "../icons/Bag";
import Spinner from "../shared/Spinner";
import { useAddToCartMutation } from "@/services/cart/cartApi";
import { toast } from "react-hot-toast";
import { TiTickOutline } from "react-icons/ti";

const CartButton = ({ product }) => {
  const [qty, setQty] = useState(1);
  const [
    addToCart,
    { isLoading: addingToCart, data: cartData, error: cartError }
  ] = useAddToCartMutation();

  useEffect(() => {
    if (addingToCart) {
      toast.loading("در حال افزودن به سبد خرید...", { id: "addToCart" });
    }

    if (cartData) {
      toast.success(cartData?.description, { id: "addToCart" });
      setQty(1);
    }
    if (cartError?.data) {
      toast.error(cartError?.data?.description, { id: "addToCart" });
    }
  }, [addingToCart, cartData, cartError]);
  const [selectedUnit, setSelectedUnit] = useState(product?.variations?.[0]);
  const handleUnitClick = (unit) => {
    setSelectedUnit(unit);
  };
  const originalPrice = selectedUnit?.price || 0;
  const discountedPrice =
    product?.discountAmount > 0
      ? originalPrice * (1 - product.discountAmount / 100)
      : originalPrice;
  return (
    <section className="flex h-[200px] !z-[90000] flex-row mb-24 bg-gray-50  rounded-t-primary md:rounded-none shadow-t-lg md:shadow-none items-start md:bg-white dark:bg-slate-900 md:dark:bg-[#121212] dark:gap-x-4 md:h-full  border dark:border-slate-600 md:border-none">
      <div className="flex-flex-col gap-y-8 md:w-fit w-full">
        <div className="flex flex-col gap-y-12">
          <div className=" hidden md:flex mt-6  flex-wrap gap-4  items-center">
            {" "}
            {[...(product?.variations || [])]
              .sort((a, b) => Number(a.unit.value) - Number(b.unit.value))
              .map((variation) => (
                <div key={variation?._id} className="relative">
                  <button
                    onClick={() => handleUnitClick(variation)}
                    className={`relative rounded-full flex items-center justify-center text-xl transition-all duration-300 ease-in-out
                  ${
                    selectedUnit?.unit._id === variation.unit._id
                      ? "bg-primary outline-none ring-2 ring-primary  ring-offset-4 dark:ring-offset-[#121212] "
                      : "bg-secondary"
                  }`}
                    style={{
                      width: `${20 + variation.unit.value * 10}px`,
                      height: `${20 + variation.unit.value * 10}px`
                    }}
                  >
                    {selectedUnit?.unit._id === variation.unit._id ? (
                      <TiTickOutline className="w-8 h-8 text-white" />
                    ) : (
                      ""
                    )}
                    <div
                      className={`absolute bottom-full  left-1/2 -translate-x-1/2 mb-4 px-2 py-1 bg-secondary text-white text-sm rounded shadow-lg transition-opacity duration-300 whitespace-nowrap
    ${
      selectedUnit?.unit._id === variation.unit._id
        ? "opacity-100 visible"
        : "opacity-0 invisible group-hover:opacity-100 group-hover:visible"
    }`}
                    >
                      {variation?.unit?.description}
                      {/* فلش Tooltip بالا */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-8 border-transparent border-t-secondary"></div>
                    </div>
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-secondary text-white text-sm rounded shadow-lg transition-opacity duration-300  whitespace-nowrap
                  ${
                    selectedUnit?.unit._id === variation.unit._id
                      ? "opacity-100 visible"
                      : "opacity-0 invisible group-hover:opacity-100 group-hover:visible"
                  }`}
                    >
                      {variation?.unit?.title}
                      {/* فلش Tooltip */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full border-8 border-transparent border-b-secondary"></div>
                    </div>
                  </button>
                </div>
              ))}
          </div>
          <div className="flex gap-x-2 items-center md:justify-start justify-between p-4 md:p-0">
            {discountedPrice < originalPrice && (
              <span className="text-red-500 block line-through text-sm">
                {originalPrice.toLocaleString("fa-IR")} ریال
              </span>
            )}

            <span className="text-green-500 block text-lg !leading-none">
              {discountedPrice > 0
                ? `${discountedPrice.toLocaleString("fa-IR")} ریال`
                : `${originalPrice.toLocaleString("fa-IR")} ریال`}
            </span>
          </div>
        </div>
        <div className=" flex md:hidden  gap-4 justify-center w-full items-center">
          {" "}
          {[...(product?.variations || [])]
            .sort((a, b) => Number(a.unit.value) - Number(b.unit.value))
            .map((variation) => (
              <div key={variation?._id} className="relative">
                <button
                  onClick={() => handleUnitClick(variation)}
                  className={`relative rounded-full flex items-center justify-center text-xl transition-all duration-300 ease-in-out mt-9
                  ${
                    selectedUnit?.unit._id === variation.unit._id
                      ? "bg-primary outline-none ring-2 ring-primary dark:ring-secondary ring-offset-4 dark:ring-offset-slate-900"
                      : "bg-secondary"
                  }`}
                  style={{
                    width: `${20 + variation.unit.value * 10}px`,
                    height: `${20 + variation.unit.value * 10}px`
                  }}
                >
                  {selectedUnit?.unit._id === variation.unit._id ? (
                    <TiTickOutline className="w-8 h-8 text-white" />
                  ) : (
                    ""
                  )}
                  <div
                    className={`absolute bottom-full  left-1/2 -translate-x-1/2 mb-4 px-2 py-1 bg-secondary text-white text-sm rounded shadow-lg transition-opacity duration-300 whitespace-nowrap
    ${
      selectedUnit?.unit._id === variation.unit._id
        ? "opacity-100 visible"
        : "opacity-0 invisible group-hover:opacity-100 group-hover:visible"
    }`}
                  >
                    {variation?.unit?.description}
                    {/* فلش Tooltip بالا */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-8 border-transparent border-t-secondary"></div>
                  </div>
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 z-[99999] py-1 bg-secondary text-white   text-sm rounded shadow-lg transition-opacity duration-300  whitespace-nowrap
                  ${
                    selectedUnit?.unit._id === variation.unit._id
                      ? "opacity-100 visible"
                      : "opacity-0 invisible group-hover:opacity-100 group-hover:visible"
                  }`}
                  >
                    {variation?.unit?.title}
                    {/* فلش Tooltip */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full border-8 border-transparent border-b-secondary dark:"></div>
                  </div>
                </button>
              </div>
            ))}
        </div>
        <div className="flex justify-between md:mt-4 items-center gap-4 p-4">
          <div className="flex bg-white md:dark:bg-[#121212] dark:bg-slate-900 flex-row gap-x-2  items-center border px-1 py-0.5 rounded-secondary h-full">
            <button
              className="border bg-primary  border-white/30 disabled:border-zinc-100 p-1.5 text-white rounded-secondary "
              onClick={() => setQty(qty - 1)}
              disabled={qty === 1}
            >
              <AiOutlineMinus className="w-4 h-4" />
            </button>
            <span className="px-2 py-0.5 rounded-primary border w-12 inline-block text-center">
              {qty}
            </span>
            <button
              className="border bg-primary text-white border-white/30 disabled:border-zinc-100 p-1.5 rounded-secondary"
              onClick={() => setQty(qty + 1)}
            >
              <AiOutlinePlus className="w-4 h-4" />
            </button>
          </div>

          <button
            className="px-8 py-2 border border-primary rounded-secondary bg-primary hover:bg-primary/90 text-white transition-colors drop-shadow w-fit flex flex-row gap-x-2 items-center"
            disabled={qty === 0 || addingToCart}
            onClick={() => {
              addToCart({
                product: product._id,
                quantity: qty,
                variation: selectedUnit?._id
              });
            }}
          >
            {addingToCart ? (
              <Spinner />
            ) : (
              <>
                <Bag />
                <span className="md:hidden text-white">افزودن</span>
                <span className="md:flex hidden text-white">
                  اضافه کردن به سبد خرید{" "}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CartButton;
