"use client";

import React, { useState } from "react";
import EventCard from "@/components/Events/EventCard";
import { eventsdata } from "@/SampleData/Eventsdata";

const categories = [
  "Birthday",
  "Anniversary",
  "Kid's Party",
  "Romantic Decors",
];

const EventPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredEvents =
    selectedCategory === "All"
      ? eventsdata
      : eventsdata.filter((event) => event.category === selectedCategory);

  return (
    <div className="container mx-auto p-2">
      <h2 className="text-lg font-semibold mb-4">Top Categories</h2>
      <div className="flex gap-2 overflow-x-scroll mb-5 border-white border-b pb-2">
        <button
          className={`px-4 py-2 text-sm min-w-fit rounded ${
            selectedCategory === "All"
              ? "bg-blue-500 font-semibold text-white"
              : "bg-white"
          }`}
          onClick={() => setSelectedCategory("All")}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 text-sm min-w-fit  rounded ${
              selectedCategory === category
                ? "bg-blue-500 font-semibold text-white"
                : "bg-white"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredEvents.map((event, index) => (
          <EventCard
            key={index}
            title={event.title}
            imageUrl={event.imageUrl}
            originalPrice={event.originalPrice}
            discountedPrice={event.discountedPrice}
            couponCode={event.couponCode}
            className="text-sm p-2"
            imgStyle={{ height: "70%", width: "70%" }}
            cardStyle={{ width: "60%", height: "80%" }}
            category={event.category}
            vendorName={event.vendorName}
            vendorProfile={event.vendorProfile}
            eventManagerName={event.eventManagerName}
            eventManagerProfile={event.eventManagerProfile}
          />
        ))}
      </div>
    </div>
  );
};

export default EventPage;
