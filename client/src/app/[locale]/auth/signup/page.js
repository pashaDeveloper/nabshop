"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import Spinner from "@/components/shared/Spinner";
import { motion } from "framer-motion";
import Main from "@/components/shared/layouts/Main";
import GoogleLogin from "./GoogleLogin";
import MobileLogin from "./MobileLogin";
const Signin = () => {
  const router = useRouter();







  return (
    <Main>
      <section className="w-full h-auto pt-24 md:pt-36 bg-lightbg dark:bg-slate-900">
        <div className="container md:py-10 h-full">
          <div className="flex justify-center items-center flex-wrap h-full g-3 text-gray-800">
            <div className=" md:w-8/12 lg:w-6/12  md:mb-0 md:flex ">
              <motion.div
                whileHover={{
                  rotate: [0, -10, 10, -10, 0]
                }}
                className="md:w-[400px] w-[200px] cursor-pointer"
              >
                <Image
                  src={"/chef1.png"}
                  width={600}
                  height={600}
                  alt="chef1"
                  className="h-full"
                />
              </motion.div>
            </div>{" "}
            <div className="w-full md:w-[30rem]">
              <form className="p-2">
                <GoogleLogin />
              </form>
              <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                <p className="text-center text-textColor text-sm font-semibold mx-4 mb-0">
                  یا
                </p>
              </div>
                <MobileLogin />
            </div>
          </div>
        </div>
      </section>
    </Main>
  );
};

export default Signin;
