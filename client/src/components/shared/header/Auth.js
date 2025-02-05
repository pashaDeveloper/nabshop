

import Link from "next/link";
import React, { useState } from "react";
import User from "@/components/icons/User";

const Auth = () => {


  return (
    <div className="flex items-center">
     <Link
  className="p-2 rounded-secondary flex items-center hover:bg-slate-100  transition-colors"
  href="/auth/signin">
  <User className="h-6 w-6" />
</Link>
     
    </div>
  );
};

export default Auth;
