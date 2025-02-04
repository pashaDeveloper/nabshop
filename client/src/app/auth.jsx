
"use client";

import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { usePersistLoginQuery } from "@/services/auth/authApi";
import { addUser } from "@/features/auth/authSlice";
import { toast } from "react-hot-toast";


const Auth = ({ children }) => {
  const dispatch = useDispatch();
  const { data: userData, error: userError } = usePersistLoginQuery();
  const user = useMemo(() => userData?.data || {}, [userData]);
  useEffect(() => {
    if (userData && !userError) {
      dispatch(addUser(user));
    }

    if (userError?.data) {
    }
  }, [userData, userError, dispatch, user]);

  return <>{children}</>;
};

export default Auth;
