"use client";
import { useState, useEffect } from "react";

export default function EventCreationPage() {
  const [eventName, setEventName] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [eventDate, setEventDate] = useState(undefined); 
  const [description, setDescription] = useState(undefined);
  const [eventVenue, setEventVenue] = useState(undefined);
  const [eventType, setEventType] = useState("Online");
  const [isClient, setIsClient] = useState(false); 

  const eventOptions = ["Conference", "Workshop", "Meetup", "Wedding", "Birthday"];

  useEffect(() => {
    setEventDate("");
    setDescription("");
    setEventVenue("");
    setIsClient(true);
  }, []);

  const handleEventChange = (e) => {
    const value = e.target.value;
    setEventName(value);

    if (value.length > 0) {
      setFilteredEvents(eventOptions.filter(event => 
        event.toLowerCase().includes(value.toLowerCase())
      ));
    } else {
      setFilteredEvents(eventOptions);
    }
    setShowDropdown(true);
  };

  const handleSelectEvent = (event) => {
    setEventName(event);
    setShowDropdown(false);
  };

  if (!isClient) return null; 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 transition-all">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create New Event</h2>
        <form className="space-y-4">
         
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Event Name</label>
            <input
              type="text"
              placeholder="Type to search or enter new event"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 transition"
              value={eventName}
              onChange={handleEventChange}
              onFocus={() => {
                setShowDropdown(true);
                setFilteredEvents(eventOptions);
              }}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              aria-expanded={showDropdown}
            />
            {showDropdown && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto shadow-lg">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event, index) => (
                    <li
                      key={index}
                      className="p-2 hover:bg-blue-100 cursor-pointer transition"
                      onMouseDown={() => handleSelectEvent(event)}
                    >
                      {event}
                    </li>
                  ))
                ) : (
                  <li className="p-2 text-gray-500">No matching events</li>
                )}
              </ul>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Event Date</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 transition"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Event Type</label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 transition"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
            >
              <option value="Online">Online</option>
              <option value="In-Person">In-Person</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Event Venue</label>
            <input
              type="text"
              placeholder="Enter location"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 transition"
              value={eventVenue}
              onChange={(e) => setEventVenue(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              placeholder="Event details"
              className="w-full border border-gray-300 rounded-lg p-2 h-28 focus:ring-2 focus:ring-blue-400 transition"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}
