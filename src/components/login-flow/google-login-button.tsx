"use client";

import { auth } from "@/src/firebase.config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import GoogleIcon from "@/src/assets/icons/google.svg";

const GoogleLoginButton = () => {
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const { user } = await signInWithPopup(auth, provider);
      if (user && user.email) {
        console.log("Google sign-in successful", user);
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <button
      className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 flex gap-3 py-3.5 justify-center items-center rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer px-10 transform hover:scale-[1.02] active:scale-[0.98]"
      onClick={handleGoogleSignIn}
    >
      <GoogleIcon className="w-5 h-5" />
      <p className="text-white text-base font-semibold tracking-wide">
        Login with Google
      </p>
    </button>
  );
};

export default GoogleLoginButton;
