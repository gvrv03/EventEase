'use client';
import React, { useState } from "react";
import { useRouter } from 'next/navigation';

export default function Home() {
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const handleInputChange = (e) => {
    setPhone(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/login/otp?phone=${encodeURIComponent(phone)}`);  
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-blue-300">
      <div className="bg-white w-[90%] sm:w-[400px] rounded-lg p-6 shadow-lg relative">
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          ✕
        </button>

        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-blue-600">EventEase</h1>
          <p className="text-gray-600 mt-2">Let the celebrations begin with EventEase!</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="phone" className="block text-gray-900 font-medium mb-2">
            Login or Signup
          </label>
          <div className="flex items-center border rounded-lg px-3 py-2">
            <span className="text-gray-900 mr-2">+91</span>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={handleInputChange}
              placeholder="Enter mobile number"
              className="w-full outline-none text-gray-700"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            CONTINUE
          </button>
        </form>

        {/* Terms and Conditions */}
        <div className="text-xs text-gray-500 text-center mt-4">
          <p>
            By clicking on Continue, I accept the{" "}
            <a href="#" className="text-blue-500 underline">
              Terms & Conditions
            </a>{" "}
            &{" "}
            <a href="#" className="text-blue-500 underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
