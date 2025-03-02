import React, { useState ,useEffect } from "react";
import { motion } from "framer-motion";
import { useSignUpPhoneMutation } from "@/services/auth/authApi";
import Spinner from "@/components/shared/Spinner";
import { toast } from "react-hot-toast";

function Mobile({ onSuccess ,phone ,setPhone}) {
  const [message, setMessage] = useState("");
  const [signUp, { isLoading, error,data  }] = useSignUpPhoneMutation();

  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{4})(\d{3})(\d{4})$/);
    return match ? `${match[1]}-${match[2]}-${match[3]}` : cleaned;
  };

  const handleChange = (e) => {
    setPhone(formatPhoneNumber(e.target.value));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    phone = String(phone).replace(/-/g, "");
    setPhone(phone);
    if (phone.length < 11) {
      setMessage("شماره تلفن معتبر نیست!");
      return;
    }

 signUp({ phone });
     
  };

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال ورود...", { id: "signup" });
    }

    if (data) {
      toast.success(data?.description, { id: "signup" });
      onSuccess();
    }
    if (error?.data) {
      toast.error(error?.data?.description, { id: "signup" });
    }
  }, [isLoading, data, error]);

  return (
    <div className="mb-6 px-8">
      <input
        type="text"
        className="form-control block w-full h-14 px-8  text-gray-700 bg-white dark:text-gray-100 dark:bg-slate-800 border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700  dark:focus:text-gray-100 focus:bg-white focus:border-orange-600 focus:outline-none text-left !text-2xl"
        placeholder="شماره تلفن"
        dir="ltr"
        inputMode="tel"
        value={phone}
        onChange={handleChange}
      />

      <motion.button
        className="cursor-pointer flex items-center justify-center px-7 py-3 bg-gradient-to-br from-orange-400 to-orange-500 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-orange-600 hover:shadow-lg focus:bg-orange-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-orange-800 active:shadow-lg transition duration-150 ease-in-out w-full mt-3"
        whileHover={!isLoading ? { scale: 1.05 } : {}}
        whileTap={!isLoading ? { scale: 0.95 } : {}}
        onClick={handleSignUp}
        disabled={isLoading}
      >
        {isLoading ? <Spinner /> : "ورود"}
      </motion.button>

      {message && (
        <p
          className={`mt-3 text-sm text-center ${
            error ? "text-red-500" : "text-green-500"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default Mobile;
