"use client"
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css/navigation";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Image from "next/image";
import { motion } from "framer-motion";
function Left() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <div className="col-span-1 h-full min-h-[450px] w-full flex flex-col relative px-3 ">
      <div className="absolute w-full top-1/2  flex justify-between z-50">
        <div className="custom-prev -right-5 absolute flex justify-center items-center p-4 border-4 rounded-full cursor-pointer text-gray-700 w-8 h-8 bg-white dark:bg-gray-700 border-lightbg dark:border-darkbg -lg text-lg">
          <span>
            <IoIosArrowForward size={30} className="dark:text-gray-100" />
          </span>
        </div>
        <div className="custom-prev left-0 absolute flex justify-center items-center p-4 border-4 rounded-full cursor-pointer dark:border-darkbg text-gray-700 w-8 h-8 bg-white border-lightbg  text-lg dark:bg-gray-700">
          <span>
            <IoIosArrowBack size={30} className="dark:text-gray-100"  />
          </span>
        </div>
      </div>
      <div
        className="w-full relative h-full rounded-xl mt-6 flex flex-col 
             bg-gradient-to-t bg-cover bg-center 
             overflow-hidden "
        style={{
          backgroundImage:
            "linear-gradient(to top, #ed1945, #ed1945), url(/assets/home/banner/dots.svg)",
          backgroundBlendMode: "overlay" 
        }}
      >
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 9000,
            disableOnInteraction: false
          }}
          pagination={{
            clickable: true
          }}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev"
          }}
          modules={[Autoplay, Pagination, Navigation]}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="flex flex-col gap-y-4 justify-center items-center p-4 text-right md:text-center">
              <motion.h2
                className="md:text-5xl text-white font-nozha text-6xl w-full text-right"
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                نقل سنتی ناب
              </motion.h2>
              <p className="text-white text-lg">
                نقل خوشمزه با طعمی دلنشین و شیرینی ملایم
              </p>
            </div>
            <div className="absolute -bottom-8 -right-2 md:flex">
              <motion.div
                animate={{ y: ["0px", "20px", "0px"] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 3
                }}
              >
                <Image
                  src="/assets/home/banner/cake1.webp"
                  height={872}
                  width={500}
                  alt={"banner1"}

                  className="w-72 ml-4 block md:mr-auto"
                />
              </motion.div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flex flex-col gap-y-4 p-4">
              <motion.h2
                className="text-5xl text-white font-nozha w-full text-right"
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                حلوا سنتی ناب
              </motion.h2>
              <p className="text-white text-lg">
                حلوا با عطر و طعم بی‌نظیر، مناسب برای مجالس و مهمانی‌ها
              </p>
              <div className="absolute flex -bottom-8 left-44 md:flex">
                <motion.div
                  animate={{ y: ["0px", "20px", "0px"] }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 3
                  }}
                >
                  <Image
                    src="/assets/home/banner/cake2.webp"
                    height={524}
                    width={483}
                    alt={"banner2"}
                    className="w-72 ml-4 block md:mr-auto"
                  />
                </motion.div>
              </div>
            </div>
            <div className="absolute flex -bottom-8 -left-44 md:flex">
              <motion.div
                animate={{ y: ["0px", "20px", "0px"] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 3
                }}
              >
                <Image
                  src="/assets/home/banner/cake3.webp"
                  height={500}
                  width={835}
                  alt={"banner3"}
                  className="w-56 ml-4 block md:mr-auto"
                />
              </motion.div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flex flex-col p-4 gap-y-4">
              <motion.h2
                className="text-5xl text-white font-nozha w-full text-right"
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                عرقیجات گیاهی ناب
              </motion.h2>
              <p className="text-white text-lg">
                عرقیجات خالص و طبیعی برای سلامتی و آرامش
              </p>
            </div>
            <div className="absolute flex -bottom-8 -left-44 md:flex">
              <motion.div
                animate={{ y: ["0px", "20px", "0px"] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 3
                }}
              >
                <Image
                  src="/assets/home/banner/cake4.webp"
                  height={872}
                  width={500}
                  alt={"banner4"}

                  className="w-80 ml-4 block md:mr-auto"
                />
              </motion.div>
            </div>
          </SwiperSlide>
          <div className="autoplay-progress" slot="container-end">
            <svg viewBox="0 0 48 48" ref={progressCircle}>
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref={progressContent}></span>
          </div>
        </Swiper>
      </div>
    </div>
  );
}

export default Left;
