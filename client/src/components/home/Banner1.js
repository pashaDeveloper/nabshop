import React from "react";
import Image from "next/image";
import { AiTwotoneFire } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Right from "./right";
import CountdownTimer from "./CountdownTimer";
import Container from "../shared/Container";
import { motion } from "framer-motion"; // Import motion from framer-motion

const Banner1 = () => {
  const router = useRouter();

  return (
    <Container>
      <div className="grid md:grid-cols-3  mt-24 md:mt-28 justify-center grid-cols-1 md:gap-4">
        <div className="col-span-2 h-full flex flex-col gap-y-4 ">
          {/* Animated banner container */}
          <div
            className="w-full  md:mt-5 h-full rounded-primary relative flex flex-col gap-y-8 lg:px-22 lg:py-[80px] md:pt-8 pb-0"
            style={{
              backgroundImage:
                "url(/assets/home/banner/dots.svg), linear-gradient(to top right, #ef4444, #ef4444)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              overflow: "hidden" // اضافه کردن این خط برای مخفی کردن هر چیزی که از بنر بیرون می‌رود
            }}
          >
           
          </div>

          {/* Animated Countdown section */}
          <div className="bg-blue-100 rounded-primary  hidden md:flex flex-col gap-y-4 md:flex-row justify-between items-center md:p-6 p-2 rtl">
            <h1 className="md:text-3xl hidden md:flex text-4xl font-nozha text-right leading-tight">
              تا پایان
            </h1>

            <CountdownTimer targetDate="2025-02-31T23:59:59" />
            <h1 className="text-3xl  font-nozha text-right leading-tight">
              {"  "}
              به مناسبت افتتاح فروشگاه
            </h1>
            <span className="text-pink-800 text-4xl font-nozha">
              ارسال رایگان به سراسر کشور
            </span>
          </div>
        </div>

        {/* Animated Right Component */}
        <div className="flex flex-col w-full pt-4 gap-4">
          <Right />
        </div>
      </div>
    </Container>
  );
};

export default Banner1;
