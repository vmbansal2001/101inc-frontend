"use client";

import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import useAuthenticator from "./use-authenticator";
import { auth } from "@/src/firebase.config";

const Authenticator = () => {
  const { handleAuthUserChange } = useAuthenticator();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleAuthUserChange);

    return () => unsubscribe();
  }, []);
  return null;
};

export default Authenticator;
