import { Wrench } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-16 bg-black text-gray-400">
      <div className="common-frame-box py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="bg-red-600 rounded-full p-1.5 text-white shadow-lg">
              <Wrench size={14} strokeWidth={2} />
            </div>
            <div>
              <span className="text-xl text-white font-bold tracking-tight">
                101 Inc
              </span>
            </div>
          </div>
          <p className="text-xs md:text-sm font-medium text-gray-400">
            On-demand auto and home repair services. Reliable, transparent, and
            always nearby.
          </p>
          <p className="text-xs md:text-sm font-medium text-gray-400">
            Powered by DNY Tech Solutions LLC
          </p>
        </div>

        <p className="text-[11px] md:text-xs text-gray-500">
          ©2025 101 Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
