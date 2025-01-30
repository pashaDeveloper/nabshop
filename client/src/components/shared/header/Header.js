import React, { useEffect, useState } from "react";
import Container from "../Container";
import Image from "next/image";
import Categories from "./Categories";
import Auth from "./Auth";
import Dashboard from "@/components/icons/Dashboard";
import SearchFilter from "./SearchFilter";
import MyCart from "./MyCart";
import { useSelector } from "react-redux";
import Brand from "@/components/icons/Brand";
import Category from "@/components/icons/Category";
import Store from "@/components/icons/Store";
const Header = () => {
  const user = useSelector((state) => state?.auth?.user);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); 
  }, []);
  const niches = [
    {
      title: "محصولات",
      icon: <Brand />,
    },
    {
      title: "دسته بندی",
      icon: <Category />,
    },
    {
      title: "مجله",
      icon: <Store />,
    },
  ];
  const [selectedNiche, setSelectedNiche] = useState("Category");

  return (
    <Container className="w-full">
      <nav className="rounded-xl p-4 flex flex-row-reverse justify-between z-20">
        <div className="flex flex-row gap-x-4 items-center relative">
          <Image
            src="/logo.png"
            alt="logo"
            width={141}
            height={40}
            className="h-[40px] object-contain md:block cursor-pointer"
            onClick={() => window.open("/", "_self")}
          />

          <div className="border-l h-7 rounded" />

          {/* <Categories /> */}
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
                    (selectedNiche === niche.title ? "bg-black text-white" : "")
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
          {selectedNiche === "Category" &&""}
          {selectedNiche === "Store" && ""}
        </div>
        <div className="flex flex-row-reverse gap-x-2 relative">
          {isClient && user && Object.keys(user).length > 0 && (
            <button
              className="p-2 rounded-secondary hover:bg-slate-100 transition-colors"
              onClick={() => window.open("/dashboard", "_self")}
            >
              <Dashboard className="h-6 w-6" />
            </button>
          )}
          <SearchFilter />
          <Auth />
          <MyCart />
        </div>
      </nav>
    </Container>
  );
};

export default Header;
