import React from "react";
import { motion } from "framer-motion";

const StaticsImages = ({ items }) => {
  return (
    <div className="w-full h-full   grid grid-cols-2 justify-center mt-6 md:mt-12 lg:px-30 gap-y-12">
  {items.map((item, index) => (
    <div
      key={index}
      className="cursor-pointer col-span-1 mx-4 mt-4 drop-shadow-lg px-2 p-2 bg-cardOverlay  rounded-xl flex flex-col items-center justify-center"
    >
      <motion.img
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 1.1 }}
        src={item.imgSrc}
        alt="icecream"
        className=" w-40 -mt-10 lg:-mt-20"
      />
      <p className=" text-xl font-semibold font-nozha text-textColor">{item.title}</p>
      <p className="text-[10px] lg:text-lg text-lightGray font-semibold my-2 lg:my-3">
        {item.desc}
      </p>
      <p className="text-sm font-semibold text-headingColor">
        <span className="text-xs text-red-600">تومان</span> {item.price}
      </p>
    </div>
  ))}
</div>

  );
};

export default StaticsImages;
