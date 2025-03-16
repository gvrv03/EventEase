"use client";
import { useAuth } from "@/Context/AuthContext";
import { getEMVEvents, getUsersEvents } from "@/Services/Appwrite";
import moment from "moment/moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export const EventCard = ({ event }) => {
  const router = useRouter();
  return (
    <div className="bg-white flex-col flex  justify-between rounded-lg shadow-md p-3 hover:shadow-lg transition-shadow">
      {/* Event Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {event.EventName}
          </h2>
          <p className="text-sm text-gray-500">
            {moment(event.eventDate).format("MMM DD, YYYY")}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            event.Progress === "Pending"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {event.Progress}
        </span>
      </div>

      {/* Event Details */}
      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-600">{event.Description}</p>
          <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
            {event.Category}
          </span>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Services Required:
          </h3>
          <div className="flex flex-wrap gap-2">
            {event.Services.map((service, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        {/* Provider Details */}
        <div className="border-t pt-3 mt-3">
          <div className="flex justify-between items-start">
            <div className="">
              <h3 className="text-sm font-medium text-gray-700">
                Event Manager:
              </h3>
              <p className="text-sm text-gray-600">{event.EMVDetails.Name}</p>
            </div>
            <div className="text-right">
              <h3 className="text-sm font-medium text-gray-700">Client:</h3>
              <p className="text-sm text-gray-600">{event.userDetails.Name}</p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => router.push(`/Event/Customize/${event.$id}`)}
        className="mt-4 text-sm w-full bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        View Detail
      </button>
    </div>
  );
};

const EMVEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getEvents = async () => {
    try {
      setLoading(true);
      const response = await getEMVEvents();
      setEvents(response);
    } catch (error) {
      setError(error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  if (loading) {
    return (
      <div className=" mx-auto py-2">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
          ].map((item) => (
            <div
              key={item}
              className="bg-white rounded-lg shadow-md p-2 animate-pulse"
            >
              {/* Event Header Skeleton */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="h-5 w-32 bg-gray-200 rounded"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded mt-2"></div>
                </div>
                <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
              </div>

              {/* Event Details Skeleton */}
              <div className="space-y-3">
                <div>
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-20 bg-gray-200 rounded mt-2"></div>
                </div>

                {/* Services Skeleton */}
                <div>
                  <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                  <div className="flex flex-wrap gap-2">
                    <div className="h-5 w-16 bg-gray-200 rounded"></div>
                    <div className="h-5 w-20 bg-gray-200 rounded"></div>
                    <div className="h-5 w-24 bg-gray-200 rounded"></div>
                  </div>
                </div>

                {/* Provider Details Skeleton */}
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-2">
                      <div className="h-4 w-24 bg-gray-200 rounded"></div>
                      <div className="h-4 w-32 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 h-10 w-full bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center text-red-500">
          Error loading events: {error}
        </div>
      </div>
    );
  }

  return (
    <div className=" mx-auto ">
      <div className="flex justify-between items-center pb-2">
        <h1 className="text-2xl font-bold">Events Enquiry</h1>
      </div>
      {events.length === 0 ? (
        <div className="text-center text-gray-500 py-8">No events found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {events.map((event) => (
            <EventCard key={event.$id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EMVEvents;
