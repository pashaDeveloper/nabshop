"use client";

import React, { useEffect, useMemo } from "react";
import Container from "../shared/Container";
import Card from "../shared/Card";
import Spinner from "../shared/Spinner";
import { useRouter } from "next/navigation";
import { useGetProductsQuery } from "@/services/product/productApi";
import ProductCard from "../shared/skeletonLoading/ProductCard";
import { toast } from "react-hot-toast";
import HighlightText from "../shared/highlightText/HighlightText";

const Trending = () => {
  const router = useRouter();
  const {
    data: productsData,
    error: productsError,
    isLoading: productsLoading
  } = useGetProductsQuery();
  const products = useMemo(() => productsData?.data || [], [productsData]);

  useEffect(() => {
    if (productsError) {
      toast.error(productsError?.data?.description, { id: "trending" });
    }
  }, [productsError]);

  return (
    <Container>
      <div className="flex flex-col gap-y-10">
      <div className="lg:text-5xl md:text-4xl text-3xl w-fit whitespace-normal">
      <HighlightText title={"داغ‌ترین‌های امروز "} />

        </div>
        <div className="flex flex-col gap-y-12">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 md:gap-x-6 gap-y-8">
            {productsLoading || (!productsLoading && products?.length === 0) ? (
              <>
                {[1, 2, 3, 4].map((_, index) => (
                  <ProductCard key={index} />
                ))}
              </>
            ) : (
              <>
                {products?.slice(-8)?.map((product, index) => (
                  <Card key={index} product={product} />
                ))}
              </>
            )}
          </div>
          <button
            className="px-8 py-4 border border-black rounded-secondary bg-black hover:bg-black/90 text-white transition-colors drop-shadow w-fit mx-auto flex flex-row gap-x-2 items-center"
            onClick={() => router.push("/products")}
          >
نمایش بیشتر          </button>
        </div>
      </div>
    </Container>
  );
};

export default Trending;
