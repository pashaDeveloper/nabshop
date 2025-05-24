import React from "react";
import Container from "../shared/Container";
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import ExpertCard from "../shared/skeletonLoading/ExpertCard";
import HighlightText from "../shared/highlightText/HighlightText";
import Link from "next/link";

const ExpertChoice = async ({ className }) => {
  const api = `${process.env.NEXT_PUBLIC_BASE_URL}` + `/product/get-products`;
  const response = await fetch(api, {
    cache: "no-store",
    next: { tags: ["product", `product`] }
  });
  const res = await response.json();
  const products = res.data;

  return (
    <Container className={className ? className : ""}>
      <section className="flex flex-col gap-y-10">
        <h1 className="text-4xl w-fit">
          <HighlightText title={"محبوب‌ ترین‌ محصولات"} />
        </h1>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-8">
          {products?.length === 0 ? (
            <>
              {[1, 2, 3, 4].map((_, index) => (
                <ExpertCard key={index} />
              ))}
            </>
          ) : (
            <>
              {products?.slice(-8)?.map((product, index) => (
                <Link
                  href={`/products/${product?.productId}/${product?.slug}`}
                  key={index}
                  className="flex flex-col gap-y-4 border border-gray-100 dark:border-blue-500 p-4 rounded-lg hover:border-gray-300 dark:hover:border-gray-800 transition-colors cursor-pointer"
                >
                  <div className="grid grid-cols-12 grid-rows-6 gap-2 h-[200px]">
                    {product.gallery.map((thumbnail, idx) => (
                      <Image
                        key={idx}
                        src={thumbnail?.url}
                        alt={thumbnail?.public_id}
                        width={296}
                        height={200}
                        className={`${
                          product.gallery.length === 1
                            ? "col-span-12 row-span-6"
                            : product.gallery.length === 2
                            ? "col-span-12 row-span-3"
                            : product.gallery.length === 3
                            ? idx === 0
                              ? "col-span-12 row-span-3"
                              : "col-span-6 row-span-3"
                            : product.gallery.length === 4
                            ? "col-span-6 row-span-3"
                            : idx <= 1
                            ? "col-span-6 row-span-3"
                            : "col-span-4 row-span-3"
                        } h-full w-full object-cover rounded`}
                      />
                    ))}
                  </div>

                  <article className="flex flex-col gap-y-3.5">
                    <div className="flex flex-row items-center gap-x-1.5">
                      <div className="h-5 border-l w-[1px]"></div>
                      <Badge className="text-purple-800 bg-purple-100">
                        {"در" + product?.variations?.length + " " + "وزن"}
                      </Badge>
                    </div>
                    <div className="flex flex-col gap-y-4">
                      <h2 className="line-clamp-1">{product?.title}</h2>
                      <div className="flex flex-row items-end justify-between">
                        <span className="flex items-center border-2 border-green-500 rounded py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium">
                          <span className="text-green-500 !leading-none">
                            <div className="text-left">
                              {product?.variations?.[0]?.price &&
                              product?.discountAmount > 0 ? (
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
                          </span>
                        </span>
                        <span className="flex flex-row items-center gap-x-0.5">
                          <AiFillStar className="text-[#ffc242]" />
                          <span className="text-sm">
                            {product?.reviews?.length}
                          </span>
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </>
          )}
        </div>
      </section>
    </Container>
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

export default ExpertChoice;
