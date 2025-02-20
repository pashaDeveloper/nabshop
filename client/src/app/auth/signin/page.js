"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect ,  useState } from "react";
import Spinner from "@/components/shared/Spinner";
import { useSignInMutation } from "@/services/auth/authApi";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import Main from "@/components/shared/layouts/Main"
const Signin = () => {
  const router = useRouter();
  const [signin, { isLoading, data, error }] = useSignInMutation();
  const [phone, setPhone] = useState("");

  const formatPhoneNumber = (value) => {
    // حذف کاراکترهای غیرعددی
    const cleaned = value.replace(/\D/g, "");

    // فرمت شماره به‌صورت ۰۹۱۲-۳۴۵-۶۷۸۹
    const match = cleaned.match(/^(\d{4})(\d{3})(\d{3})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    
    return cleaned; 
  };

  const handleChange = (e) => {
    setPhone(formatPhoneNumber(e.target.value));
  };
  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال ورود...", { id: "signin" });
    }

    if (data) {
      toast.success(data?.description, { id: "signin" });
      localStorage.setItem("accessToken", data?.accessToken);

      // open new tab
      setTimeout(() => {
        window.open("/", "_self");
      }, 1000);
    }
    if (error?.data) {
      toast.error(error?.data?.description, { id: "signin" });
    }
  }, [isLoading, data, error]);

  const handleSignin = async (e) => {
    e.preventDefault();

    signin({ email: e.target.email.value, password: e.target.password.value });
    e.target.reset();
  };

  return (
    <Main>

    <section className="w-full h-auto mt-24 md:mt-36">
      <div className="container md:py-10 h-full">
        <div className="flex justify-center items-center flex-wrap h-full g-3 text-gray-800">
        <div className=" md:w-8/12 lg:w-6/12  md:mb-0 md:flex ">
        <motion.div
      whileHover={{
        rotate: [0, -10, 10, -10, 0],
      }}
      className="md:w-[400px] w-[200px] cursor-pointer" // Tailwind برای عرض 600px
    >
      <Image
        src={"/chef1.png"} // مسیر صحیح
        width={600} // عرض
        height={600} // ارتفاع
        alt="chef1"
        className="h-full"
      />
    </motion.div>
    </div>          <div className="w-full md:w-[30rem]">
            <form className="p-2">
            <div className="flex items-center justify-center gap-5  text-center">
    
      <motion.p
        whileHover={{ scale: 1.1 }}
        className="flex items-center w-64 h-10 bg-slate-100  justify-center rounded text-headingColor px-5 cursor-pointer shadow-sm hover:bg-slate-100"
        onClick={() => AUTH({ provider: GOOGLE_PROVIDER })}
      >
        <FcGoogle className="text-xl w-5 ml-1" />
        <span>ورود از طریق حساب گوگل</span>
      </motion.p>
    </div>              <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                <p className="text-center text-textColor text-sm font-semibold mx-4 mb-0">
                  یا
                </p>
              </div>
              <div className="mb-6">
              <input
      type="text"
      className="form-control block w-full px-4 py-2 text-gray-700 bg-white border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none text-left"
      placeholder="شماره تلفن"
      dir="ltr"
      inputMode="tel"
      value={phone}
      onChange={handleChange}
    />
              </div>

              

              <motion.p
                className="cursor-pointer flex items-center justify-center px-7 py-3 bg-gradient-to-br from-orange-400 to-orange-500 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-orange-600 hover:shadow-lg focus:bg-orange-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
             
                whileHover={{ scale: 1.1 }}
              >
                ورود
              </motion.p>
              <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
               
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </section>
    </Main>
  );
};

export default Signin;
