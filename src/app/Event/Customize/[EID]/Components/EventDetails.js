import React from "react";
import { Calendar, User, Tag, BadgeCheck, CalendarRange } from "lucide-react";
import Link from "next/link";
import { useEvents } from "@/Context/EventContext";
import moment from "moment/moment";

const EventDetails = () => {
  const { eventSingle } = useEvents();
  return (
    <div className="bg-white p-3 rounded-lg shadow-md w-full ">
      <img
        src="http://localhost:3000/_next/image?url=%2Fproducts%2FAnniversary-1.png&w=1920&q=75"
        alt="event"
        className="w-full md:h-96 rounded-lg object-cover "
      />
      <div className="flex justify-between mt-5 items-center">
        <h2 className="text-xl font-bold text-gray-800">
          {eventSingle?.EventName}
        </h2>
        <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
          {eventSingle?.Progress}
        </span>
      </div>
      <p className="text-gray-600 flex items-center gap-2 text-sm mt-1">
        <CalendarRange size={15} />
        {moment(eventSingle?.eventDate).format("DD MMM YYYY")}
      </p>
      <p className="text-gray-700 mt-4">{eventSingle?.Description}</p>

      <span className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full mt-2 inline-block">
        {eventSingle?.Category}
      </span>

      <h3 className="text-gray-800 font-semibold mt-4">Services Required:</h3>
      <div className="flex flex-wrap gap-2 mt-2">
        {eventSingle?.Services?.map((service, index) => (
          <span
            key={index}
            className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full"
          >
            {service}
          </span>
        ))}
      </div>

      <hr className="my-4" />
      <div className="border flex-col w-full md:w-fit rounded-lg text-gray-800 font-medium text-lg flex p-2 items-center gap-2">
        <div className="flex items-center justify-start gap-2">
          <User className="w-4 h-4 text-gray-600" />
          <p className=" text-sm">Vikrant Borkar</p>
        </div>
        <Link
          href={`/UserProfiles/${eventSingle?.EMVDetails?.$id}`}
          className=" text-sm bg-blue-500 text-white px-10 p-1 text-center rounded-md w-full"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default EventDetails;
