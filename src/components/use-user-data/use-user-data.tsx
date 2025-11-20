"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useGetUserByEmailQuery,
  usePostUserDataMutation,
} from "@/src/services/users/users.query";
import { useAppSelector } from "@/src/store/hooks";

const useUserData = () => {
  const { currentUser } = useAppSelector((state) => state.authState);

  const userEmail = currentUser?.email;

  const { data: userData, isLoading: isUserQueryLoading } =
    useGetUserByEmailQuery({ email: userEmail || "" }, { skip: !userEmail });

  const [postUserData] = usePostUserDataMutation();

  const updateUserData = async (data: any) => {
    const response = await postUserData({ body: data });
    return response;
  };

  return {
    userData,
    isUserQueryLoading,
    updateUserData,
  };
};

export default useUserData;
