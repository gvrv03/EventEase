"use client";

import React, { useState } from "react";
import Link from "next/link";

const Signup = () => {
  const [role, setRole] = useState("");

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-400">
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Create an Account</h2>
        <form className="space-y-2">
          <div>
            <label className="block text-xs font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 text-sm"
              placeholder="Full Name"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 text-sm"
              placeholder="Email"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700">Mobile No.</label>
            <input
              type="tel"
              className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 text-sm"
              placeholder="Mobile No."
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 text-sm"
            >
              <option value="">Select Role</option>
              <option value="customer">Customer</option>
              <option value="vendor">Vendor</option>
              <option value="event_manager">Event Manager</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 text-sm"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-1 px-2 rounded-lg hover:bg-blue-700 transition duration-300 text-sm"
          >
            Sign Up
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Already have an account? {" "}
          <Link href="/account-create/Login" className="text-indigo-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
