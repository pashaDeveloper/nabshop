import React from "react";
import Container from "../shared/Container";
import Image from "next/image";
import Link from "next/link";

const Banner2 = ({ className }) => {
  return (
    <Container className={className ? className : ""}>
      <div
        className="bg-yellow-100  dark:bg-red-600 h-full pt-8 w-full dark:text-gray-100 rounded-primary gap-16 flex md:flex-row flex-col gap-y-0  px-8  "
        style={{ backgroundImage: "url(/assets/home/banner/dots.svg)" }}
      >
        <div className="w-96 h-fit order-2 md:order-1">
          <Image
            src="/assets/home/banner/kid.webp"
            alt="model"
            height={904}
            width={1024}
            className="h-full  w-full object-cover"
          />
        </div>
        <article className="flex flex-col  order-1 md:order-2 justify-start items-end order-1">
          <div className="flex flex-col  md:gap-y-8 gap-y-4 max-w-lg z-48 lg:ml-auto lg:mr-0 mr-auto">
            <h2 className="md:text-6xl dark:text-gray-100 font-nozha text-gray-900 text-4xl">
              نقل و حلوای ناب{" "}
            </h2>
            <h3 className="md:text-6xl dark:text-gray-100 font-nozha text-gray-900 text-4xl">
              طعمی ماندگار از دل سنت
            </h3>
            <p className="flex flex-row dark:text-gray-100 gap-x-0.5 items-center text-lg text-slate-500">
              با نقل و حلوای ناب، طعم اصیل و خانگی را تجربه کنید. محصولی
              باکیفیت، تهیه‌شده از بهترین مواد اولیه، برای شیرین کردن لحظات شما.
              ارسال به سراسر کشور با تضمین تازگی!
            </p>
            <Link
              href={"/fa/products"}
              className="px-8 py-4 border border-black rounded-secondary bg-black hover:bg-black/90 text-white transition-colors drop-shadow w-fit mt-4"
            >
              تجربه کنید
            </Link>
          </div>
        </article>
      </div>
    </Container>
  );
};

export default Banner2;
