import React from "react";

import Favorites from "../ThemeToggle/ThemeToggle";
import Cart from "../cart/Cart";
import Search from "../searchTrio/Search";
import Auth from "../auth/Auth";

function ToolBar() {

	  
  return (
    <div className="px-6 sm:px-25 z-[9999] fixed w-full bottom-4">
      <div className=" md:hidden  p-2  w-full  bg-white dark:bg-gray-900 shadow-3xl text-gray-500 rounded-2xl cursor-pointer">
        <div className=" p-2 rounded-2xl flex items-center justify-between">
          <Search forToolbar={true} />

          <Cart forToolbar={true} />

          <div className="flex flex-col items-center  hover:text-blue-400 ">
            <div className="absolute bottom-8 shadow-2xl text-center flex items-center justify-center rounded-full border-4 text-3xl border-gray-50 hover:border-[rgb(34,197,94)] bg-[rgb(34,197,94)] w-[68px] h-[68px] p-2 text-white transition ease-in duration-200 ">
           
              <span className="animate-ping  border-[rgb(34,197,94)] absolute inline-flex h-full w-full rounded-full border-4 opacity-50"></span>
            </div>
          </div>
          <Favorites />
          <Auth />
        </div>
      </div>
    </div>
  );
}

export default ToolBar;
