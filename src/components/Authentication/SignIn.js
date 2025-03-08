"use client"; // Required for client-side interactivity

import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { SignInUser } from "@/Services/Appwrite";
import { useRouter } from "next/navigation";
import { useAuth } from "@/Context/AuthContext";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { checkUserStatus } = useAuth();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await SignInUser(formData.email, formData.password);
      toast.success("Login Successful!");
      checkUserStatus();
      router.push("/UserProfiles");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 text-sm"
          placeholder="Enter your email"
          required
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
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 text-sm"
          placeholder="Enter your password"
          required
        />
      </div>
      <div className="pt-2">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 font-semibold px-4 rounded-lg hover:bg-blue-700 transition duration-300 text-sm"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </div>
    </form>
  );
};

export default SignIn;
