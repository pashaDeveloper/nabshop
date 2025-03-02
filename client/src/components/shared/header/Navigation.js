import React from "react";
import SearchFilter from "./SearchFilter";
import MyCart from "./MyCart";
import Auth from "./Auth";
import { TfiHeadphoneAlt } from "react-icons/tfi";

function Navigation() {
  return (
    <div className="px-6 sm:px-25 z-50 fixed w-full bottom-4">
      <div className=" md:hidden  p-2  w-full  bg-white dark:bg-gray-900 shadow-3xl text-gray-500 rounded-2xl cursor-pointer">
        <div className=" p-2 rounded-2xl flex items-center justify-between">
        <MyCart />

        <SearchFilter />

        <div className="flex flex-col items-center  hover:text-blue-400 ">
          <div className="absolute bottom-8 shadow-2xl text-center flex items-center justify-center rounded-full border-4 text-3xl border-gray-50 hover:border-primary bg-primary w-16 h-16 p-2 text-white transition ease-in duration-200 ">
          <TfiHeadphoneAlt className="w-12 h-12" />
            <span className="animate-ping  border-primary absolute inline-flex h-full w-full rounded-full border-4 opacity-50"></span>
          </div>
        </div>
        <div className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            ></path>
          </svg>
        </div>
        <div className="relative">
          <Auth />
        </div>
      </div>
    </div>
    </div>
  );
}

export default Navigation;
