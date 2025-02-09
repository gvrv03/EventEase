"use client";

import React, { useState } from "react";
import Link from "next/link";

const Signup = () => {
  const [role, setRole] = useState("");

  return (
    <div className="flex items-center justify-center ">
      <div className="w-full ">
       
        <form className="space-y-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 text-sm"
              placeholder="Full Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 text-sm"
              placeholder="Email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mobile No.
            </label>
            <input
              type="tel"
              className="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 text-sm"
              placeholder="Mobile No."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 text-sm"
            >
              <option value="">Select Role</option>
              <option value="customer">Customer</option>
              <option value="vendor">Vendor</option>
              <option value="event_manager">Event Manager</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 text-sm"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 font-semibold px-2 rounded-lg hover:bg-blue-700 transition duration-300 text-sm"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
