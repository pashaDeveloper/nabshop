// pages/new-arrivals.tsx یا pages/new-arrivals.js
import React from "react";
import HighlightText from "@/components/shared/highlightText/HighlightText";
import Container from "@/components/shared/Container";
import ProductCard from "@/components/shared/skeletonLoading/ProductCard";
import NewArrivalsCarousel from "./NewArrivalsCarousel";
import Card from "@/components/shared/Card";

const NewArrivals = async () => {
  const api = `${process.env.NEXT_PUBLIC_BASE_URL}/product/get-products`;
  const response = await fetch(api, {
    cache: "no-store",
    next: { tags: ["product", `product`] }
  });
  const res = await response.json();
  const products = res.data;

  return (
    <Container>
      <section className="flex flex-col gap-y-10">
        <h1 className="text-4xl w-fit">
          <HighlightText title={"محصولات جدید ما"} center />
        </h1>

        <div className="">
          {products?.length === 0 ? (
            <>
              {[1, 2, 3, 4].map((_, index) => (
                <ProductCard key={index} />
              ))}
            </>
          ) : (
            <>
              <div className="hidden  md:grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 md:gap-x-6 gap-y-8">
                {products?.map((product, index) => (
                  <Card key={index} index={index} product={product} />
                ))}
              </div>
              <div className=" block md:hidden">
                <NewArrivalsCarousel products={products} />
              </div>
            </>
          )}
        </div>
      </section>
    </Container>
  );
};

export default NewArrivals;
