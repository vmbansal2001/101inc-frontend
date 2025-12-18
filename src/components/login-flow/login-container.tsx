import { Wrench } from "lucide-react";
import PhoneLogin from "./phone-login/phone-login";

const LoginContainer = () => {
  return (
    <div className="w-fit z-10 rounded-t-2xl md:rounded-b-2xl shadow-xl border-2 border-red-800/30 md:px-8 md:pt-8 md:pb-12 pt-4 pb-10 px-3 flex flex-col relative items-center bg-white backdrop-blur-sm overflow-hidden">
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

      <p className="text-center text-xs text-slate-500 absolute bottom-0 w-fit mx-auto bg-slate-100 rounded-t-lg px-4 py-1">
        Powered by DNY Tech Solutions LLC
      </p>
    </div>
  );
};

export default LoginContainer;
