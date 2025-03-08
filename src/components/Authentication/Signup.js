"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SignUpUser } from "@/Services/Appwrite";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/Context/AuthContext";
const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { checkUserStatus } = useAuth();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.fullName || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      await SignUpUser(formData.email, formData.password, formData.fullName);
      toast.success("Signup successful");
      checkUserStatus();
      router.push("/UserProfiles");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full">
        <form onSubmit={handleSubmit} className="space-y-3">
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              disabled={isLoading}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm 
                focus:ring focus:ring-blue-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-200"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm 
                focus:ring focus:ring-blue-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-200"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm 
                focus:ring focus:ring-blue-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-200"
              placeholder="Create a password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 font-semibold px-4 rounded-lg 
              hover:bg-blue-700 transition duration-200 flex items-center justify-center
              disabled:opacity-50 disabled:cursor-not-allowed text-sm gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Signing up...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {/* Sign in link */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
