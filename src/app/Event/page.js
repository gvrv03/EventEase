"use client";

import React, { useState } from "react";
import EventCard from "@/components/Events/EventCard";

const categories = ["Birthday", "Anniversary", "Kid's Party", "Romantic Decors"];

const events = [
  {
    title: "Gold and Black black Arch Birthday Decor",
    imageUrl: "/products/Birthday-1.png",
    originalPrice: 2299,
    discountedPrice: 2069,
    couponCode: "EVENT15",
    category: "Birthday",
    vendorName: "Khomendra Dahake",
    vendorProfile: "/Profiles/Venders/Vender-1.png",
    eventManagerName: "Alice Johnson",
    eventManagerProfile: "/Profiles/Event-Managers/Event-Manager-1.jpg"
  },
  {
    title: "Red and White Anniversary Romantic Decor",
    imageUrl: "/products/Anniversary-1.png",
    originalPrice: 2299,
    discountedPrice: 1890,
    couponCode: "EVENT15",
    category: "Anniversary",
    vendorName: "Emily Smith",
    vendorProfile: "/Profiles/Venders/Vender-1.png",
    eventManagerName: "Guarav Narnaware",
    eventManagerProfile: "/Profiles/Event-Managers/Event-Manager-1.jpg"
  },
  {
    title: "Purple Chrome And Silver Chrome Arch Birthday Decor",
    imageUrl: "/products/Birthday-2.png",
    originalPrice: 2599,
    discountedPrice: 2009,
    couponCode: "EVENT15",
    category: "Kid's Party",
    vendorName: "Michael Johnson",
    vendorProfile: "/Profiles/Venders/Vender-1.png",
    eventManagerName: "Minakshi Sharma",
    eventManagerProfile: "/Profiles/Event-Managers/Event-Manager-2.jpg"
  },
  {
    title: "Silver and Black Flower wall Decor for Birthday",
    imageUrl: "/products/Birthday-3.png",
    originalPrice: 2559,
    discountedPrice: 2050,
    couponCode: "EVENT15",
    category: "Romantic Decors",
    vendorName: "Sophia Wilson",
    vendorProfile: "/Profiles/Venders/Vender-1.png",
    eventManagerName: "David Martinez",
    eventManagerProfile: "/Profiles/Event-Managers/Event-Manager-1.jpg"
  }
];

const EventPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredEvents = selectedCategory === "All" ? events : events.filter(event => event.category === selectedCategory);

  return (
    <div className="container mx-auto p-2">
      <h2 className="text-lg font-semibold mb-4">Top Categories</h2>
      <div className="flex space-x-4 mb-6 border-b pb-2">
        <button 
          className={`px-4 py-2 rounded ${selectedCategory === "All" ? "bg-blue-500 text-white" : "bg-gray-200"}`} 
          onClick={() => setSelectedCategory("All")}
        >
          All
        </button>
        {categories.map(category => (
          <button 
            key={category}
            className={`px-4 py-2 rounded ${selectedCategory === category ? "bg-blue-500 text-white" : "bg-gray-200"}`} 
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
