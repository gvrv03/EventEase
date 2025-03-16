"use client";

import React, { useEffect, useState } from "react";
import { ListCollectionData } from "@/Services/Appwrite";
import { EventCreationCollection } from "@/config/appwrite";
import { Query } from "appwrite";
import { EventCard } from "@/components/Events/AllEventsMV/EMVEvents";

const EventPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getEvents = async (category) => {
    try {
      setLoading(true);
      const filters = [Query.equal("Progress", "Completed")];
      if (category && category !== "All") {
        filters.push(Query.equal("Category", category));
      }
      const response = await ListCollectionData(EventCreationCollection, filters);
      setEvents(response?.documents || []);
      if (categories.length === 1) {
        extractCategories(response?.documents || []);
      }
    } catch (error) {
      setError(error?.message || "Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const extractCategories = (eventsData) => {
    const uniqueCategories = new Set(["All", ...eventsData.map((event) => event.Category).filter(Boolean)]);
    setCategories(Array.from(uniqueCategories));
  };

  useEffect(() => {
    getEvents(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    getEvents("All");
  }, []);

  return (
    <div className="mx-auto p-2">
      <h2 className="text-lg font-semibold mb-4">Top Categories</h2>
      <div className="flex gap-2 overflow-x-auto mb-5 border-white border-b pb-2">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 text-sm min-w-fit rounded transition duration-300 ${
              selectedCategory === category
                ? "bg-blue-500 font-semibold text-white"
                : "bg-white hover:bg-gray-200"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      {loading ? (
        <div className="text-center text-lg font-semibold">Loading Events...</div>
      ) : error ? (
        <div className="text-center text-red-500">Error: {error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {events.length > 0 ? (
            events.map((event, index) => <EventCard key={event.id || index} event={event} />)
          ) : (
            <div className="col-span-4 text-center text-gray-500">No events found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default EventPage;