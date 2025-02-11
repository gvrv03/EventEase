"use client"; 

import { useState, useEffect } from "react";
import { vendorsData } from "./data";
import VendorCard from "./VendorCard";

export default function VendorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [vendorCategories, setVendorCategories] = useState([]);

  useEffect(() => {
    setFilteredVendors(vendorsData);

    const categories = new Set();
    vendorsData.forEach((vendor) => {
      vendor.services.split(", ").forEach((service) => categories.add(service));
    });
    setVendorCategories([...categories]);
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      setShowDropdown(true);
      const filtered = vendorsData.filter((vendor) =>
        vendor.services.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredVendors(filtered.length > 0 ? filtered : []);
    } else {
      setShowDropdown(false);
      setFilteredVendors(vendorsData);
    }
  };

  const handleSelectCategory = (category) => {
    setSearchTerm(category);
    setShowDropdown(false);
    const filtered = vendorsData.filter((vendor) =>
      vendor.services.toLowerCase().includes(category.toLowerCase())
    );
    setFilteredVendors(filtered.length > 0 ? filtered : []);
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-green-50 to-green-100">
      <h2 className="text-4xl font-bold text-gray-900 text-center mb-8">
        Find the Best Vendors for Your Event
      </h2>

      <div className="relative w-full max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search by vendor category..."
          className="w-full p-3 border-2 border-green-400 rounded-full mb-6 text-lg shadow-sm focus:ring-2 focus:ring-green-500 outline-none"
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => searchTerm && setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
        />

        {showDropdown && vendorCategories.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto shadow-lg">
            {vendorCategories.map((category, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onMouseDown={() => handleSelectCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVendors.length > 0 ? (
          filteredVendors.map((vendor, index) => (
            <VendorCard key={vendor.id || index} vendor={vendor} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No vendors found for this category.
          </p>
        )}
      </div>
    </div>
  );
}
