import React from "react";

export default function SearchBar({ searchTerm, setSearchTerm, eventOptions, onSelectEvent }) {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="Search by event type..."
        className="w-full p-3 border-2 border-blue-400 rounded-full mb-6 text-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setSearchTerm(searchTerm)} // Keeps dropdown open
      />
      {eventOptions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto shadow-lg">
          {eventOptions.map((event, index) => (
            <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer" onMouseDown={() => onSelectEvent(event)}>
              {event}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
