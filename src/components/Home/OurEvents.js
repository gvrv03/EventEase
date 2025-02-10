"use client"
import { eventsdata } from "@/SampleData/Eventsdata";
import React from "react";
import EventCard from "../Events/EventCard";
import { useRouter } from "next/navigation";

const OurEvents = () => {
    const router = useRouter()
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between mb-2 items-center text-lg md:text-xl py-2 font-semibold border-b  border-gray-200 ">
        <p>Our Past Events</p>
        <button 
        onClick={() => router.push("/Event")}
        className="text-blue-700">See More</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {eventsdata.map((event, index) => (
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

export default OurEvents;
