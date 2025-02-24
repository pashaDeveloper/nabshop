"use client";

import React, { useEffect, useMemo } from "react";
import Container from "../shared/Container";
import Card from "../shared/Card";
import { useGetProductsQuery } from "@/services/product/productApi";
import ProductCard from "../shared/skeletonLoading/ProductCard";
import { toast } from "react-hot-toast";
import HighlightText from "@/components/shared/highlightText/HighlightText";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { Pagination, FreeMode } from "swiper/modules";

const NewArrivals = () => {
  const {
    data: productsData,
    error: productsError,
    isLoading: productsLoading,
  } = useGetProductsQuery();
  
  const products = useMemo(() => productsData?.data || [], [productsData]);
  useEffect(() => {
    if (productsError) {
      toast.error(productsError?.data?.description, {
        id: "new-arrivals",
      });
    }
  }, [productsError]);

  return (
    <Container>
      <section className="flex flex-col gap-y-10">
        <h1 className="text-4xl w-fit">
          <HighlightText title={"محصولات جدید ما"} center />
        </h1>

        {/* دسکتاپ: نمایش در گرید */}
        <div className="hidden md:grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 md:gap-x-6 gap-y-8">
          {productsLoading || !productsLoading && products?.length === 0 ? (
            <>
              {[1, 2, 3, 4].map((_, index) => (
                <ProductCard key={index} />
              ))}
            </>
          ) : (
            <>
              {products?.slice(0, 4)?.map((product, index) => (
                <Card key={index} index={index} product={product} />
              ))}
            </>
          )}
        </div>

        <div className="block md:hidden  ">
          <Swiper
            slidesPerView={1.2} 
            spaceBetween={10} 
            modules={[Pagination, FreeMode]}
            className="w-full h-full  z-50"
          >
            {productsLoading || !productsLoading && products?.length === 0 ? (
              <>
                {[1, 2, 3, 4].map((_, index) => (
                  <SwiperSlide key={index}>
                    <ProductCard />
                  </SwiperSlide>
                ))}
              </>
            ) : (
              <>
                {products?.slice(0, 4)?.map((product, index) => (
                  <SwiperSlide key={index}>
                    <Card index={index} product={product} />
                  </SwiperSlide>
                ))}
              </>
            )}
          </Swiper>
        </div>
      </section>
    </Container>
  );
};

export default NewArrivals;
