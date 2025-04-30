import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { auth, provider } from "@/config/firebaseConfig"; 
import { signInWithPopup } from "firebase/auth"; 
import { useSignUpGoogleMutation } from "@/services/auth/authApi";

function GoogleLogin() {
  const [signUp, { isLoading, error, data }] = useSignUpGoogleMutation();

  const handleLogin = async () => {
    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken();
    console.log(idToken);
    signUp({ idToken });
  };

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال ورود...", { id: "signup" });
    }

    if (data) {
      toast.success(data?.description, { id: "signup" });
      localStorage.setItem("accessToken", data?.accessToken);
      setTimeout(() => {
        window.open("/", "_self");
      }, 1000);
    }
    if (error?.data) {
      toast.error(error?.data?.description, { id: "signup" });
    }
  }, [isLoading, data, error]);

  return (
    <div>
      <div className="flex items-center justify-center gap-5 text-center">
        <motion.p
          whileHover={{ scale: 1.1 }}
          className="flex items-center w-64 h-10 bg-slate-100 justify-center rounded text-headingColor px-5 cursor-pointer shadow-sm hover:bg-slate-100"
          onClick={handleLogin}
        >
          <FcGoogle className="text-xl w-5 ml-1" />
          <span>ورود از طریق حساب گوگل</span>
        </motion.p>
      </div>
    </div>
  );
}

export default GoogleLogin;
