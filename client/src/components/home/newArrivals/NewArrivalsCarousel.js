"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { Pagination, FreeMode } from "swiper/modules";
import Card from "@/components/shared/Card";

function NewArrivalsCarousel({ products }) {
  console.log("slider", products);
  return (
    <div>
      {" "}
      <Swiper
        slidesPerView={1.2}
        spaceBetween={10}
        modules={[Pagination, FreeMode]}
        className="w-full h-full z-50"
      >
        {products?.slice(0, 4)?.map((product, index) => (
          <SwiperSlide key={index}>
            <Card index={index} product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default NewArrivalsCarousel;
