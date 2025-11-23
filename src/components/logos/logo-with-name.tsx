import { Wrench } from "lucide-react";

const LogoWithName = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-red-600 rounded-full p-2 text-white shadow-lg">
        <Wrench size={16} strokeWidth={2} />
      </div>
      <span className="text-xl font-bold text-gray-900 tracking-tight">
        101 Inc
      </span>
    </div>
  );
};

export default LogoWithName;
