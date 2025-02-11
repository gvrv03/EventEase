"use client";
import { useState, useEffect } from "react";
import { managersData } from "./data";
import ManagerCard from "./ManagerCard";
import SearchBar from "./SearchBar";

export default function EventManagersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredManagers, setFilteredManagers] = useState(managersData);
  const [showDropdown, setShowDropdown] = useState(false);
  const [eventOptions, setEventOptions] = useState([]);

  useEffect(() => {
    setEventOptions(() => {
      const specialties = new Set();
      managersData.forEach((manager) => {
        manager.specialty.split(", ").forEach((spec) => specialties.add(spec));
      });
      return Array.from(specialties);
    });
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      setShowDropdown(true);
      const filtered = managersData.filter((manager) =>
        manager.specialty.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredManagers(filtered.length > 0 ? filtered : []);
    } else {
      setShowDropdown(false);
      setFilteredManagers(managersData);
    }
  };

  const handleSelectEvent = (event) => {
    setSearchTerm(event);
    setShowDropdown(false);
    const filtered = managersData.filter((manager) =>
      manager.specialty.toLowerCase().includes(event.toLowerCase())
    );
    setFilteredManagers(filtered.length > 0 ? filtered : []);
  };

  const handleFocus = () => {
    if (searchTerm.length > 0) {
      setShowDropdown(true);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowDropdown(false);
    }, 200); 
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-blue-100">
      <h2 className="text-4xl font-bold text-gray-900 text-center mb-8">
        Find Your Perfect Event Manager
      </h2>

      <div className="relative w-full max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search by event type..."
          className="w-full p-3 border-2 border-blue-400 rounded-full mb-6 text-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        {showDropdown && eventOptions.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto shadow-lg">
            {eventOptions.map((event, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onMouseDown={() => handleSelectEvent(event)}
              >
                {event}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredManagers.length > 0 ? (
          filteredManagers.map((manager, index) => (
            <ManagerCard key={index} manager={manager} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No event managers found for this category.
          </p>
        )}
      </div>
    </div>
  );
}
