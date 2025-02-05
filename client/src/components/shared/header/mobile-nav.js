// import React from 'react'

import { MdOutlineRestaurantMenu, MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
const MobileNav = ({
  isOpen,
  setIsOpen,
}) => {
  const handleToggleCart = () => {
    dispatch({
      type: "TOGGLE_CART",
      showCart: !showCart,
    });
  };
  const handleToggleContact = () => {
    dispatch({
      type: "TOGGLE_CONTACT_FORM",
      showContactForm: !showContactForm,
    });
  }
  return (
    <div className="flex fixed inset-0 flex-col bg-white backdrop-blur-sm items-start justify-start gap-16 w-screen h-screen  overflow-y-hidden  z-50 overflow-hidden ">
      <motion.div className="flex items-center justify-between w-screen h-24  px-10">
        <motion.div
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 200 }}
          className="relative flex items-center justify-center text-textColor"
          onClick={handleToggleCart}
        >
          <MdShoppingBasket className="text-4xl cursor-pointer" />
         
        </motion.div>
        <motion.div
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 200 }}
          className="relative flex items-center justify-center text-textColor"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MdOutlineRestaurantMenu className="text-headingColor text-4xl" />
          
        </motion.div>
      </motion.div>
      <div
        className={`flex items-center justify-center w-full  h-72 gap-10 flex-col`}
      >
        <Link onClick={() => setIsOpen(!isOpen)} href={'/menu'} className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out px-10">
فروشگاه        </Link>
        <Link onClick={() => setIsOpen(!isOpen)} href={'services'} className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out px-10">
          خدمات
        </Link>
        <Link onClick={() => setIsOpen(!isOpen)} href={'/about'} className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out px-10">
          درباره ما
        </Link>
        <p onClick={handleToggleContact} className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out px-10">
          تماس با ما
        </p>
      </div>

      <Link
        href={"/"}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center  justify-center w-full"
      >
        <motion.div
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Image src={"/logo.png"} width={300} height={300} alt="Logo" className="w-16 object-cover" />
          <p className="text-headingColor text-3xl font-bold">NAB</p>
        </motion.div>
      </Link>
    </div>
  );
};

export default MobileNav;
