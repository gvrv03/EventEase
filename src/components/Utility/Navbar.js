"use client"; // Ensures it's a Client Component

import React from "react";
import Link from "next/link"; // Use Next.js routing
import { User, Heart, ShoppingCart } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white sticky top-0 z-20 flex items-center justify-between px-6 py-3 shadow-md">
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <h1
          className="text-2xl text-blue-700 font-extrabold"
          style={{ fontFamily: "Josefin Sans, sans-serif" }}
        >
          EventEase
        </h1>
      </Link>

      {/* Location */}
      <div className="hidden md:flex items-center border-l border-gray-200 pl-6">
        <div className="flex flex-col">
          <div className="font-semibold text-lg flex items-center gap-2">
            <svg
              className="text-blue-700 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 512 512"
            >
              <path d="M444.52 3.52L28.74 195.42c-47.97 22.39-31.98 92.75 19.19 92.75h175.91v175.91c0 51.17 70.36 67.17 92.75 19.19l191.9-415.78c15.99-38.39-25.59-79.97-63.97-63.97z" />
            </svg>
            Nagpur
          </div>
          <div className="text-sm text-gray-500">Nagpur city</div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex-grow flex justify-center px-6">
        <form className="w-full max-w-lg flex items-center border border-gray-300 rounded-md">
          <input
            type="text"
            placeholder="Search for 'Welcome'"
            className="flex-grow px-4 py-2 text-gray-700 focus:outline-none"
          />
          <button type="submit" className="px-4 py-2 bg-blue-700 text-white">
            Search
          </button>
        </form>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-6">
        <Link href="/account-create/login" className="flex items-center text-gray-700 hover:text-blue-700">
          <User className="h-5 w-5 mr-1" />
          Login
        </Link>
        <Link href="/wishlist" className="flex items-center text-gray-700 hover:text-blue-700">
          <Heart className="h-5 w-5 mr-1" />
          Wishlist
        </Link>
        <Link href="/cart" className="flex items-center text-gray-700 hover:text-blue-700">
          <ShoppingCart className="h-5 w-5 mr-1" />
          Cart
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
