"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="max-w-2xl px-4 py-8 mx-auto text-center">
        {/* 404 Illustration */}
        <div className="relative mb-8">
          <h1 className="text-[150px] md:text-[200px] font-bold text-gray-200">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="space-y-4">
              <div className="animate-bounce">
                <svg
                  className="w-16 h-16 mx-auto text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-6 mt-20 md:mt-24 ">
          <h2 className="text-3xl  md:text-4xl font-bold text-gray-900">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Oops! The page you're looking for seems to have wandered off. Let's get
            you back on track.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              onClick={() => router.back()}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-200"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Go Back
            </Button>
            <Button
              onClick={() => router.push("/")}
              className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-200"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Home Page
            </Button>
          </div>

          {/* Additional Help */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-600">
              Need help?{" "}
              <button
                onClick={() => router.push("/contact")}
                className="text-blue-500 hover:text-blue-600 font-medium"
              >
                Contact Support
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
