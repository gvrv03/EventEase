"use client";
import Signup from "@/components/Authentication/Register";
import SignIn from "@/components/Authentication/SignIn";
import React, { useState } from "react";
import { LogIn, UserPlus } from "lucide-react";

const Authentication = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="my-2 rounded-xl m-auto bg-white p-2 max-w-[600px] flex flex-col gap-4 shadow-lg">
      <img 
        src="https://img.ebonow.com/Posters/Login_popup_banner.webp" 
        className="rounded-lg" 
        alt="Login Banner"
      />
      <div className="flex gap-4 items-center">
        <button 
          className={`flex items-center gap-2 text-sm pb-2 font-semibold transition-all ${isSignIn ? 'text-blue-500 border-b-2  border-blue-600' : 'text-gray-500'}`} 
          onClick={() => setIsSignIn(true)}
        >
          <LogIn size={16} /> Sign In
        </button>
        <button 
          className={`flex items-center gap-2 text-sm pb-2 font-semibold transition-all ${!isSignIn ? 'text-blue-500 border-b-2  border-blue-600' : 'text-gray-500'}`} 
          onClick={() => setIsSignIn(false)}
        >
          <UserPlus size={16} /> Sign Up
        </button>
      </div>
      {isSignIn ? <SignIn /> : <Signup />}
    </div>
  );
};

export default Authentication;
