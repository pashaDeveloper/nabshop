"use client"
import React from 'react'
import { AiTwotoneFire } from "react-icons/ai";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
function Right() {
    const router = useRouter();

    return (
        <div className="col-span-2 h-full flex flex-col mt-1 ">
        {" "}
        <div
          className="w-full bg-primary  md:mt-5 h-full rounded-xl relative flex flex-col gap-y-8 lg:px-22 lg:py-[80px] md:pt-4 pb-0"
          style={{
            backgroundImage:
              "url(/assets/home/banner/dots.svg)",

            backgroundSize: "cover",
            backgroundPosition: "center",
            overflow: "hidden"
          }}
        >
          <motion.div
              className="lg:absolute bottom-0 right-0 order-2 lg:w-[500px] lg:ml-0 md:ml-auto"
              initial={{ x: 200, opacity: 0 }}
              animate={{
                opacity: 1,
                x: 0, 
                y: ["0px", "20px", "0px"] 
              }}
              transition={{
                duration: 2, 
                ease: "easeInOut",
                repeat: 0, 
                delay: 0.3 // کمی تأخیر قبل از شروع حرکت
              }}
            >
              <motion.div
                className="lg:absolute bottom-0 right-0 order-2 lg:w-[500px] lg:ml-0 md:ml-auto"
                animate={{
                  y: ["0px", "20px", "0px"] // حرکت بالا و پایین
                }}
                transition={{
                  // نوع انیمیشن
                  repeat: Infinity, // تکرار انیمیشن حرکت بالا و پایین
                  repeatType: "loop", // نوع تکرار: حلقه‌ای
                  duration: 3 // مدت زمان یک سیکل حرکت بالا و پایین
                }}
              >
                <Image
                  src="/assets/home/banner/model1.webp"
                  alt="model"
                  height={1063}
                  width={1024}
                  className="lg:w-[500px] lg:ml-0 md:ml-auto"
                />
              </motion.div>
            </motion.div>
            <div className="md:grid md:grid-cols-5 gap-4  mt-24 md:m-0">
              <div className="md:col-span-3 hidden md:flex p-4 "></div>
              <div className="md:col-span-2 flex flex-col gap-4 p-4">
                {/* Animated Title */}
                <motion.h1
                  className="md:text-6xl text-white font-nozha text-6xl w-full text-right"
                  initial={{ x: -200, opacity: 0 }} // Initial state: Slide from left
                  animate={{ x: 0, opacity: 1 }} // End state: Position in place
                  transition={{ duration: 0.3 }} // Duration of slide-in effect
                >
                  نقل و حلوای{" "}
                  <span className="md:text-6xl text-black">ناب</span>
                  <br />
                </motion.h1>

                <motion.h1
                  className="md:text-3xl font-nozha text-4xl w-full text-right"
                  initial={{ x: -200, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  طعمی از جنس <span className="text-white">اصالت</span> و{" "}
                  <span className="text-white">لذت خالص</span>
                </motion.h1>

                <motion.p
                  className="flex flex-row gap-x-0.5 items-center text-right justify-start md:text-md text-black"
                  initial={{ x: -200, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  در این فصل، طعمی ماندگار را تجربه کنید
                  <AiTwotoneFire className="text-[#ffa384] w-6 h-6 drop-shadow" />
                </motion.p>

                {/* Animated Button */}
                <motion.button
                  className="px-8 py-4 border border-black justify-start rounded-secondary bg-black hover:bg-black/90 text-white transition-colors drop-shadow w-fit mt-4"
                  onClick={() => router.push("/")}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                >
                  شروع تجربه شیرین شما
                </motion.button>
              </div>
            </div>
        </div>
      </div>
    )
}

export default Right
