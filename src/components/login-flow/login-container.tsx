import { Wrench } from "lucide-react";
import PhoneLogin from "./phone-login/phone-login";

const LoginContainer = () => {
  return (
    <div className="w-fit z-10 rounded-t-2xl md:rounded-b-2xl shadow-xl border-2 border-red-800/30 md:p-8 py-4 px-3 flex flex-col items-center bg-white backdrop-blur-sm overflow-hidden">
      <div className="flex flex-col items-center gap-2 pb-8">
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
      <PhoneLogin />
    </div>
  );
};

export default LoginContainer;
