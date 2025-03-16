"use client";
import { useRouter } from "next/navigation";
import React from "react";

const PleaseLogin = () => {
  const router = useRouter();
  return (
    <div className="flex h-screen justify-center flex-col items-center bg-white shadow-md rounded-lg p-6 text-center">
      <h2 className="text-xl font-semibold text-gray-800">Access Denied</h2>
      <p className="text-gray-600 mt-2">Please log in to continue.</p>
      <button
        onClick={() => router.push("/Auth")}
        className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
      >
        Login
      </button>
    </div>
  );
};

export default PleaseLogin;
