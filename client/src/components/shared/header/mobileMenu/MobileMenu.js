import React, { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import Link from "next/link";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import ThemeToggle from "../../ThemeToggle/ThemeToggle";

const MobileMenu = ({ isOpen, setIsOpen }) => {

  return (
    <div className="relative">
      <motion.div
        className="flex md:hidden w-full p-0 gap-4 items-center justify-between"
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 200 }}
      >
          <div className="flex items-center justify-between w-full">
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center cursor-pointer "
              onClick={() => setIsOpen(!isOpen)}
            >
              { 
                isOpen ? <MdOutlineRestaurantMenu className="text-headingColor dark:text-gray-100 text-4xl" /> : <HiOutlineMenuAlt2 className="text- -100 (condition) {
                  
                } text-4xl" />
              }
            </motion.div>
            <Link href={"/"}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2 cursor-pointer"
              />
            </Link>
          </div>
          <ThemeToggle />

      </motion.div>
    </div>
  );
};

export default MobileMenu;
