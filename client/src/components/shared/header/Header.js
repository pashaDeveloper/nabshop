import React, { useEffect, useState } from "react";
import Image from "next/image";
import Auth from "./Auth";
import Dashboard from "@/components/icons/Dashboard";
import SearchFilter from "./SearchFilter";
import MyCart from "./MyCart";
import { useSelector } from "react-redux";
import Brand from "@/components/icons/Brand";
import Category from "@/components/icons/Category";
import Store from "@/components/icons/Store";
import { motion } from "framer-motion";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import Link from "next/link";
import MobileNav from "./mobile-nav";
const Header = () => {
  const user = useSelector((state) => state?.auth?.user);
  const [isClient, setIsClient] = useState(false);
  const [isOpenMobileNav, setIsOpenMobileNav] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const niches = [
    {
      title: "محصولات",
      icon: <Brand />
    },
    {
      title: "دسته بندی",
      icon: <Category />
    },
    {
      title: "مجله",
      icon: <Store />
    }
  ];
  const [selectedNiche, setSelectedNiche] = useState("Category");

  return (
    <div className=" relative flex justify-center">
      <nav className="rounded-xl fixed md:w-[95%] w-[90%] top-2 p-4 flex flex-row-reverse justify-between z-20 bg-white shadow-lg">
        <div className="md:flex flex-row gap-x-4 hidden items-center relative">
          <Image
            src={"/logo.png"}
            alt="logo"
            width={300}
            height={300}
            className="h-12 w-12 object-contain md:block cursor-pointer"
            onClick={() => window.open("/", "_self")}
          />
        </div>
        <div className="bg-neutral-100/70 rounded-primary  hidden md:flex">
          <div className="flex flex-row justify-center gap-x-4 overflow-x-auto">
            <div className="flex flex-row justify-center gap-x-4 border p-1 rounded-secondary bg-white overflow-x-auto scrollbar-hide">
              {niches.map((niche, index) => (
                <button
                  key={index}
                  className={
                    "text-sm text-black w-44 text-center h-10 flex flex-row items-center gap-x-1 px-8 py-2 justify-center rounded-secondary border border-transparent" +
                    " " +
                    (selectedNiche === niche.title
                      ? "bg-primary text-white"
                      : "")
                  }
                  onClick={() => setSelectedNiche(niche.title)}
                >
                  {niche.icon}
                  {niche.title}
                </button>
              ))}
            </div>
          </div>
          {selectedNiche === "Brand" && ""}
          {selectedNiche === "Category" && ""}
          {selectedNiche === "Store" && ""}
        </div>
        {/* Mobile */}
        <motion.div
          className="flex md:hidden w-full p-0 items-center justify-between"
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 200 }}
        >
          {isOpenMobileNav ? (
            <MobileNav
              isOpen={isOpenMobileNav}
              setIsOpen={setIsOpenMobileNav}
            />
          ) : (
            <div className=" flex items-center justify-between w-full">
              <motion.div
                whileTap={{ scale: 0.9 }}
                className=" flex items-center justify-center"
                onClick={() => setIsOpenMobileNav(!isOpenMobileNav)}
              >
                <HiOutlineMenuAlt2 className="text-headingColor text-4xl" />
              </motion.div>
              <Link href={"/"}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <p className="text-headingColor text-xl font-bold">NAB</p>
                  <Image
                    src={"/logo.png"}
                    alt="logo"
                    width={300}
                    height={300}
                    className="h-[45px] w-[45px] object-contain md:block cursor-pointer"
                    onClick={() => window.open("/", "_self")}
                  />{" "}
                </motion.div>
              </Link>
            </div>
          )}
        </motion.div>
        <div className="md:flex hidden  flex-row-reverse gap-x-2 relative h-fit">
          {isClient && user && Object.keys(user).length > 0 ? (
            <button
              className="p-2 rounded-secondary hover:bg-slate-100 transition-colors"
              onClick={() => window.open("/dashboard", "_self")}
            >
              <Dashboard className="h-6 w-6" />
            </button>
          ) : (
            <Auth />
          )}
          <SearchFilter />
          <MyCart />
        </div>
      </nav>
    </div>
  );
};

export default Header;
