import { motion } from "framer-motion";

const HighlightText = ({ title, center = false }) => {
  return (
    <div className={`relative ${center ? "text-center" : "text-right"}`}>
      {/* متن با افکت ظاهر شدن */}
      <motion.p
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="text-4xl text-headingColor fld capitalize"
      >
        {title}
      </motion.p>

      {/* خط زیر متن که بعد از متن نمایش داده می‌شود */}
      <motion.span
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 }} // تاخیر برای بعد از متن
        className="absolute bottom-[-8px] right-0 w-full h-1 bg-gradient-to-tr from-orange-400 to-orange-600 transform origin-right"
      />
    </div>
  );
};

export default HighlightText;
