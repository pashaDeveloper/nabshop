import Link from "next/link";
import React from "react";
import User from "@/components/icons/User";

const Auth = () => {
  return (
    <div className="flex items-center">
      <Link
        aria-label="ورود"
        className="p-2 rounded-secondary flex items-center hover:bg-slate-200  bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-700 transition-colors"
        href="/auth/signin"
      >
        <User className="h-6 w-6" />
      </Link>
    </div>
  );
};

export default Auth;
