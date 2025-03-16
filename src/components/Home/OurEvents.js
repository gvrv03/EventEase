"use client";
import { eventsdata } from "@/SampleData/Eventsdata";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ListCollectionData } from "@/Services/Appwrite";
import { EventCreationCollection } from "@/config/appwrite";
import { EventCard } from "../Events/AllEventsMV/EMVEvents";
import { Query } from "appwrite";

const OurEvents = () => {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getEvents = async () => {
    try {
      setLoading(true);
      const response = await ListCollectionData(EventCreationCollection, [
        Query.equal("Progress", "Completed"),
        Query.limit(4),
      ]);
      setEvents(response?.documents);
    } catch (error) {
      setError(error?.message);
    } finally {
      setLoading(false);
    }
  };
  console.log(events);

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="mx-auto py-8">
      {/* Header Section with gradient background */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 p-8 mb-8">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white mb-2">
            Our Past Events
          </h2>
          <p className="text-white/80">
            Discover our amazing collection of past events
          </p>
        </div>
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4">
          <div className="w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        </div>
      </div>
      {loading && (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
        </div>
      )}
      {error && <div className="text-center text-red-500">Error: {error}</div>}

      {/* Events Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {events?.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="transform transition-all duration-300 hover:shadow-xl"
          >
            <EventCard event={event} />
          </motion.div>
        ))}
      </motion.div>

      {/* See More Button */}
      <div className="flex justify-center mt-12">
        <button
          onClick={() => router.push("/Event")}
          className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium transition duration-300 ease-out border-2 border-blue-600 rounded-md hover:border-blue-700"
        >
          <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-600 group-hover:translate-x-0 ease">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </span>
          <span className="absolute flex items-center justify-center w-full h-full text-blue-600 transition-all duration-300 transform group-hover:translate-x-full ease">
            See More Events
          </span>
          <span className="relative invisible">See More Events</span>
        </button>
      </div>
    </div>
  );
};

export default OurEvents;
