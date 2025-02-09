"use client"; // Required for client-side interactivity

import React from "react";
import Link from "next/link";

const Login = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-400">
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Login</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 text-sm"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 text-sm"
              placeholder="Enter your password"
            />
          </div>
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 text-sm"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-xs text-gray-500 mt-4 text-center">
          Don't have an account? {" "}
          <Link href="/account-create/Sign-Up" className="text-indigo-600 font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
