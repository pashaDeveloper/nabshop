import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { usePersistLoginQuery } from "@/services/auth/authApi";
import { addUser } from "@/features/auth/authSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const Auth = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: userData, error: userError } = usePersistLoginQuery();
  const user = useMemo(() => userData?.data || {}, [userData]);
  useEffect(() => {
    if (userData && !userError) {
      toast.success(userData?.description, { id: "auth" });
      dispatch(addUser(user));
    }

    if (userError?.data) {
      toast.error(userError?.data?.description, { id: "auth" });
      navigate("/signin");

    }
  }, [userData, userError, dispatch, user]);

  return <>{children}</>;
};

export default Auth;
