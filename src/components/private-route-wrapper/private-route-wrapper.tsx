"use client";

import { useAppSelector } from "@/src/store/hooks";
import React from "react";
import LoginPage from "../login-flow/login-page";
import useUserData from "../use-user-data/use-user-data";

type Props = {
  children: React.ReactNode;
};

const PrivateRouteWrapper = ({ children }: Props) => {
  const { userLoading, currentUser } = useAppSelector(
    (state) => state.authState
  );

  const { userData } = useUserData();

  if (userLoading || !currentUser || !userData) {
    return <LoginPage />;
  }

  return children;
};

export default PrivateRouteWrapper;
