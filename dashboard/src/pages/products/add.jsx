import React from "react";
import AddProduct from "./steps/AddProduct";
import ThemeToggle from "@/components/ThemeToggle";
function Add() {

  return (
    <section className="w-screen relative h-screen overflow-hidden flex justify-center items-center p-4 ">
    <div className="wave "></div>
    <div className="wave wave2 "></div>
    <div className="wave wave3"></div>
    <div className="max-w-md w-full bg-white h-fit  justify-center dark:bg-gray-900 z-50 flex flex-col gap-y-4  p-4 rounded-primary shadow-lg ">
    <div className="flex flex-row  items-center gap-x-2">

   <AddProduct />
    </div>

   <ThemeToggle />
    </div>
    </section>
  );
}

export default Add;
