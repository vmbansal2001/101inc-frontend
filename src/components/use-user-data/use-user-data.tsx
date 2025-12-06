"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useGetUserByPhoneQuery,
  usePostUserDataMutation,
} from "@/src/services/users/users.query";
import { useAppSelector } from "@/src/store/hooks";

const useUserData = () => {
  const { currentUser } = useAppSelector((state) => state.authState);

  const userPhone = currentUser?.phoneNumber;

  const { data: userData, isLoading: isUserQueryLoading } =
    useGetUserByPhoneQuery({ phone: userPhone || "" }, { skip: !userPhone });

  const [postUserData] = usePostUserDataMutation();

  const updateUserData = async (data: any) => {
    const response = await postUserData({ body: data });
    return response;
  };

  return {
    userData: userData!,
    isUserQueryLoading,
    updateUserData,
  };
};

export default useUserData;
