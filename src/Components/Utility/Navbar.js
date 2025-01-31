import React from 'react';

const Navbar = () => {
  return (
    <nav className="md:mb-5 mb-2 bg-white sticky top-0 z-20 flex items-center justify-between px-6 py-3 shadow-md">
      {/* Logo */}
      <a className="flex items-center" href="/">
        <h1
          className="text-2xl text-blue-700 font-extrabold"
          style={{ fontFamily: 'Josefin Sans, sans-serif' }}
        >EventEase
        </h1>
      </a>

      {/* Location */}
      <div className="flex items-center border-l border-gray-200 pl-6">
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
        <a href="/login" className="flex items-center text-gray-700 hover:text-blue-700">
          <svg
            className="h-5 w-5 mr-1"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 512 512"
          >
            <path d="M256 256a128 128 0 1 0 128 128 128 128 0 0 0-128-128zm0-48a48 48 0 1 0-48-48 48 48 0 0 0 48 48z" />
          </svg>
          Login
        </a>
        <a href="/wishlist" className="flex items-center text-gray-700 hover:text-blue-700">
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 512 512"
          >
            <path d="M256 464l-15.35-14.35C104.25 333.05 48 281.65 48 208.05 48 144.35 101.25 96 160.75 96a96.51 96.51 0 0 1 71.5 31.5A96.51 96.51 0 0 1 304 96c59.5 0 112.75 48.35 112.75 112.05 0 73.6-56.25 125-192.65 241.6z" />
          </svg>
          Wishlist
        </a>
        <a href="/cart" className="flex items-center text-gray-700 hover:text-blue-700">
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 512 512"
          >
            <path d="M160 400a48 48 0 1 0 48-48 48.14 48.14 0 0 0-48 48zm192 0a48 48 0 1 0 48-48 48.14 48.14 0 0 0-48 48zm33.6-240H144.25l-14.35-32H48v32h32l65.6 147.2a40 40 0 0 0 35.15 22.8H352v-32H170.75l-8.75-19.6h194.2a40 40 0 0 0 37.15-24.4L429.85 144H384V96H160v48h177.4z" />
          </svg>
          Cart
        </a>
      </div>
    </nav>
  );
};

export default Navbar;

