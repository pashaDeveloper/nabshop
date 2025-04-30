
"use client"
import React from "react";
import Container from "../shared/Container";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Banner2 = ({ className }) => {
  const router = useRouter();

  return (
      <Container className={className ? className : ""}>
        <div
          className="bg-yellow-100 dark:bg-red-600 h-full w-full dark:text-gray-100 rounded-primary relative flex flex-col gap-y-0  px-8 pt-8 "
          style={{ backgroundImage: "url(/assets/home/banner/dots.svg)" }}
        >
          <Image
            src="/assets/home/banner/kid.webp"
            alt="model"
            height={904}
            width={1024}
            className="lg:absolute w-full md:w-1/2  bottom-0 left-0 order-2"
          />
          <article className="flex flex-col justify-start items-end order-1">
            <div className="flex flex-col  md:gap-y-8 gap-y-4 max-w-lg z-48 lg:ml-auto lg:mr-0 mr-auto">
              <h1 className="md:text-6xl dark:text-gray-100 font-nozha text-gray-900 text-4xl">
              نقل و حلوای ناب </h1>
              <h1 className="md:text-6xl dark:text-gray-100 font-nozha text-gray-900 text-4xl">
             طعمی ماندگار از دل سنت</h1>
              <p className="flex flex-row dark:text-gray-100 gap-x-0.5 items-center text-lg text-slate-500">
              با نقل و حلوای ناب، طعم اصیل و خانگی را تجربه کنید. محصولی باکیفیت، تهیه‌شده از بهترین مواد اولیه، برای شیرین کردن لحظات شما. ارسال به سراسر کشور با تضمین تازگی!
              </p>
              <button className="px-8 py-4 border border-black rounded-secondary bg-black hover:bg-black/90 text-white transition-colors drop-shadow w-fit mt-4"
              onClick={() => router.push("/products")}>
              تجربه کنید
              </button>
            </div>
          </article>
        </div>
      </Container>
  );
};

export default Banner2;
