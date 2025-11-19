import React from "react";
import { Wrench } from "lucide-react";
import GoogleLoginButton from "./google-login-button";

const LoginContainer = () => {
  return (
    <div className="w-fit z-10 rounded-2xl shadow-xl border-2 border-red-800/30 p-8 flex flex-col gap-8 items-center bg-white backdrop-blur-sm">
      <div className="flex flex-col items-center gap-2">
        <div className="bg-red-600 rounded-full p-5 text-white mb-2 shadow-lg">
          <Wrench size={32} strokeWidth={2.5} />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          101 Inc
        </h1>
        <p className="text-sm text-gray-600 font-medium">
          Auto & Home Services
        </p>
      </div>

      <GoogleLoginButton />
    </div>
  );
};

export default LoginContainer;
