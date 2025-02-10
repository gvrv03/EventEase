"use client"; // Required for client-side interactivity

import React from "react";
import Link from "next/link";

const SignIn = () => {
  return (
    <div className=" flex items-center justify-center ">
      <div className="  w-full ">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 block w-full px-2 py-2 border  border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 text-sm"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full px-2 py-2 border  border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 text-sm"
              placeholder="Enter your password"
            />
          </div>
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 font-semibold px-4 rounded-lg hover:bg-blue-700 transition duration-300 text-sm"
            >
              Login
            </button>
          </div>
        </form>
     
      </div>
    </div>
  );
};

export default SignIn;
