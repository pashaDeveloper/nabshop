"use client";

import React from "react";
import { motion } from "framer-motion";
import Noghl1 from "@/components/icons/category/Noghl1";
import Bottle from "@/components/icons/category/Bottle";
import Halva1 from "@/components/icons/category/Halva1";
import Cake from "@/components/icons/category/Cake";

const categories = [
  { id: 1, name: "نقل", icon: <Noghl1 className="!w-12 !h-12 text-primary dark:text-white" /> },
  { id: 2, name: "حلوا", icon: <Halva1 className="!w-12 !h-12 text-primary dark:text-white" /> },
  { id: 3, name: "عرقیجات", icon: <Bottle className="!w-12 !h-12 text-primary dark:text-white" /> },
  { id: 4, name: "کیک", icon: <Cake className="!w-12 !h-12 text-primary dark:text-white" /> },
];

function Category() {
  return (
    <div className="flex justify-center items-center gap-4">
      {categories.map((category, index) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
          className="py-2 px-2 pb-8 w-fit flex flex-col items-center justify-center rounded-[40px] 
             text-gray-800 dark:text-white cursor-pointer shadow-lg bg-white dark:bg-gray-700 
             hover:shadow-xl hover:text-gray-100 dark:hover:text-white transition-colors duration-300"
        >
          <motion.button
            whileHover={{ rotate: 10 }}
            className="w-16 h-16 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-500"
          >
            {category.icon}
          </motion.button>

          <p className="text-center mt-4 text-2xl font-nozha transition-colors duration-300 dark:text-gray-100">
            {category.name}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

export default Category;
