"use client";

import { CloudOff, Wrench } from "lucide-react";

const OfflineScreen = () => {
  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center gap-12 max-w-md w-full">
        {/* Company Logo and Name */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-red-600 rounded-full p-4 text-white shadow-lg">
              <Wrench size={32} strokeWidth={2.5} />
            </div>
            <span className="text-3xl font-bold text-gray-900 tracking-tight">
              101 Inc
            </span>
          </div>
        </div>

        {/* Offline Icon and Message */}
        <div className="flex flex-col items-center gap-6">
          <div className="bg-gray-100 rounded-full p-8">
            <CloudOff size={80} className="text-gray-400" strokeWidth={1.5} />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              You are offline
            </h2>
            <p className="text-gray-600 text-sm">
              Please check your internet connection and try again.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfflineScreen;
