"use client";

import { useAppSelector } from "@/src/store/hooks";
import LoginContainer from "./login-container";
import Image from "next/image";
import { MoonLoader } from "react-spinners";
import useUserData from "../use-user-data/use-user-data";
import OnboardingStepOne from "./onboarding-step-one/onborading-step-one";

const LoginPage = () => {
  const { userLoading, currentUser } = useAppSelector(
    (state) => state.authState
  );

  const { userData } = useUserData();

  const renderContent = () => {
    if (userLoading) {
      return <MoonLoader color="#fff" className="z-10" />;
    }
    if (!currentUser) {
      return <LoginContainer />;
    }

    return <OnboardingStepOne currentUser={currentUser} />;
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="absolute top-0 left-0 w-full h-full">
        <Image
          src="https://images.unsplash.com/photo-1585406666850-82f7532fdae3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWNoYW5pYyUyMGhvbWUlMjByZXBhaXIlMjB0b29sc3xlbnwxfHx8fDE3NjM0MDEzOTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="login-background"
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-br from-red-900/80 via-rose-800/75 to-slate-900/80" />
      </div>

      {renderContent()}
    </div>
  );
};

export default LoginPage;
