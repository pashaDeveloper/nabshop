"use client";

import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  usePersistSessionQuery,
  useCreateSessionMutation
} from "@/services/session/sessionApi";
import { setSession } from "@/features/auth/authSlice";

const Session = ({ children }) => {
  const dispatch = useDispatch();
  const [createSession] = useCreateSessionMutation();
  const { data: sessionData, error: sessionError } = usePersistSessionQuery();
  const session = useMemo(() => sessionData?.data || {}, [sessionData]);
  useEffect(() => {
    if (session && !sessionError &&sessionData?.data) {
      dispatch(setSession(session));
    }
    if (sessionError) {
      createSession();
    }
  }, [dispatch, createSession]);

  return <>{children}</>;
};

export default Session;
