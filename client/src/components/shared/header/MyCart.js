"use client";
import Cart from "@/components/icons/Cart";
import React, { useEffect, useState } from "react";
import OutsideClick from "../OutsideClick";
import Image from "next/image";
import { useSelector } from "react-redux";
import Trash from "@/components/icons/Trash";
import { useDeleteFromCartMutation } from "@/services/cart/cartApi";
import { toast } from "react-hot-toast";
import Inform from "@/components/icons/Inform";
import { useCreatePaymentMutation } from "@/services/payment/paymentApi";
import Link from "next/link";

const MyCart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, session } = useSelector((state) => state.auth);
  const [removeFromCart, { isLoading, data, error }] =
    useDeleteFromCartMutation();
  useEffect(() => {
    if (isLoading)
      toast.loading("پاک کردن سبد خرید...", { id: "removeFromCart" });
    if (data) toast.success(data?.description, { id: "removeFromCart" });
    if (error?.data)
      toast.error(error?.data?.description, { id: "removeFromCart" });
  }, [isLoading, data, error]);

  const cartItems = session?.cart || user?.cart || [];

  return (
    <>
      <button
        aria-label="سبد خرید"
        className="p-2 rounded-secondary bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Cart className="h-6 w-6" />
        {cartItems.length > 0 && (
          <span className="flex items-center absolute top-0 right-0">
            <span className="relative ml-3 mr-0.5 flex h-3 w-3">
              <span className="animate-ping bg-red-400 absolute inline-flex h-full w-full rounded-full opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-red-400"></span>
            </span>
          </span>
        )}
      </button>

      {isOpen && (
        <OutsideClick
          onOutsideClick={() => setIsOpen(false)}
          className="absolute md:top-full bottom-full mb-8  right-0 w-80 h-96 overflow-y-auto bg-white dark:bg-slate-900 border border-primary rounded p-4 flex flex-col gap-y-2.5"
        >
          <div className="w-full h-full flex flex-col gap-y-8">
            {cartItems.length === 0 ? (
              <p className="text-sm flex flex-row gap-x-1 items-center justify-center h-full w-full">
                <Inform /> هیچ محصولی در سبد خرید یافت نشد!
              </p>
            ) : (
              <div className="h-full w-full flex flex-col gap-y-4">
                <div className="h-full overflow-y-auto scrollbar-hide">
                  {cartItems.map(({ product, variation, _id, quantity }) => (
                    <div
                      key={_id}
                      className="flex flex-row gap-x-2 transition-all border border-transparent p-2 rounded hover:border-black group relative"
                    >
                      <Image
                        src={product?.thumbnail?.url}
                        alt={product?.thumbnail?.public_id}
                        width={50}
                        height={50}
                        className="rounded h-[50px] w-[50px] object-cover"
                      />
                      <article className="flex flex-col gap-y-2">
                        <h2 className="text-base line-clamp-1">
                          {product?.title}
                        </h2>
                        <p className="text-xs">
                          {product?.summary || "بدون توضیحات"}
                        </p>

                        <p className="text-xs flex flex-row justify-between">
                          <span className="flex flex-row gap-x-0.5 items-baseline">
                            قیمت:
                            <span className="text-xs text-red-500 line-through">
                              {variation?.price
                                ? `${variation.price.toLocaleString(
                                    "fa-IR"
                                  )} ریال`
                                : "?"}
                            </span>
                            {product.discountAmount && variation.price ? (
                              <span className="text-xs text-green-500 ml-1">
                                {(
                                  variation.price -
                                  variation.price *
                                    (product.discountAmount / 100)
                                ).toLocaleString("fa-IR")}{" "}
                                ریال
                              </span>
                            ) : null}
                          </span>
                          <span className="flex flex-row gap-x-0.5 items-baseline">
                            تعداد:
                            <span className="text-sm text-black">
                              {quantity}
                            </span>
                          </span>
                        </p>

                        {variation?.unit?.title && (
                          <div className="flex flex-row gap-x-1">
                            <span className="whitespace-nowrap text-[10px] bg-blue-300/50 text-blue-500 border border-blue-500 px-1.5 rounded">
                              {variation?.unit?.title}
                            </span>
                          </div>
                        )}
                      </article>

                      <button
                        type="button"
                        className="opacity-0 transition-opacity group-hover:opacity-100 absolute top-2 left-2 border p-1 rounded-secondary bg-red-100 text-red-900 border-red-900"
                        onClick={() => removeFromCart(_id)}
                      >
                        <Trash />
                      </button>
                    </div>
                  ))}
                </div>
                <Purchase cart={cartItems} />
              </div>
            )}
          </div>
        </OutsideClick>
      )}
    </>
  );
};

function Purchase({ cart }) {
  const [createPayment, { isLoading, data, error }] =
    useCreatePaymentMutation();

  useEffect(() => {
    if (isLoading)
      toast.loading("در حال انتقال به درگاه پرداخت...", {
        id: "createPayment"
      });
    if (data) {
      toast.success(data?.description, { id: "createPayment" });
      window.open(data?.url, "_blank");
    }
    if (error?.data)
      toast.error(error?.data?.description, { id: "createPayment" });
  }, [isLoading, data, error]);

  const result = cart.map(({ product, variation, _id }) => ({
    name: product?.title,
    quantity: variation?.unit?.value || 1,
    price: product?.price || 0,
    thumbnail: product?.thumbnail?.url,
    description: product?.summary,
    pid: product?._id,
    cid: _id
  }));

  return (
    <Link
    href={`/checkout`}
      type="button"
      className="px-8 py-2 border border-black rounded-secondary bg-black hover:bg-black/90 text-white transition-colors drop-shadow flex flex-row gap-x-2 items-center justify-center"
    >
      تسویه حساب
    </Link>
  );
}

export default MyCart;
