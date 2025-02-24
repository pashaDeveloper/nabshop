"use client";
import { motion } from "framer-motion";

const HighlightText = ({ title, center = false ,size="4"}) => {
  return (
    <div className={`relative ${center ? "text-center" : "text-right"}`}>
      {/* متن با افکت ظاهر شدن فقط زمانی که در ویوپورت است */}
      <motion.p
        initial={{ opacity: 0, x: 10 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.5 }} // اجرا فقط یک بار، وقتی 30% دیده شد
        className={`text-${size}xl text-headingColor dark:text-blue-100 fld capitalize`}
      >
        {title}
      </motion.p>

      {/* خط زیر متن */}
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: false, amount: 0.5 }} // مشابه تنظیمات بالا
        className="absolute bottom-[-8px] right-0 w-full h-1 bg-gradient-to-tr from-secondary to-primary transform origin-right"
      />
    </div>
  );
};

export default HighlightText;
