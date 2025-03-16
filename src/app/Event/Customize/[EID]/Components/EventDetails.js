import React, { useState, useEffect } from "react";
import { CalendarRange, User } from "lucide-react";
import Link from "next/link";
import { useEvents } from "@/Context/EventContext";
import moment from "moment";
import { useAuth } from "@/Context/AuthContext";
import { UpdateCollectionData } from "@/Services/Appwrite";
import { EventCreationCollection } from "@/config/appwrite";
import toast from "react-hot-toast";

const EventDetails = () => {
  const { eventSingle } = useEvents();
  const { user } = useAuth();

  if (!eventSingle) {
    return <p className="text-center text-gray-500">Loading event details...</p>;
  }

  const {
    $id,
    EventName,
    eventDate,
    Description,
    Category,
    Services,
    EMVDetails,
    ImageUrl,
    Progress,
  } = eventSingle;

  const isEMVEditable = EMVDetails?.$id === user?.userData?.$id;
  const [progress, setProgress] = useState(Progress || "Pending");

  useEffect(() => {
    setProgress(Progress || "Pending");
  }, [Progress]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      await UpdateCollectionData(EventCreationCollection, $id, {
        Progress: newStatus,
      });
      toast.success("Event status updated successfully");
      setProgress(newStatus);
    } catch (error) {
      toast.error(error?.message);
      console.error("Failed to update event status:", error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full">
      {/* Event Image */}
      <img
        src={ImageUrl || "/default-image.png"}
        alt="Event"
        className="w-full md:h-96 rounded-lg object-cover"
      />

      {/* Event Title & Status Dropdown */}
      <div className="flex justify-between mt-5 items-center">
        <h2 className="text-xl font-bold text-gray-800">{EventName}</h2>

        {isEMVEditable ? (
          <select
            value={progress}
            onChange={handleStatusChange}
            className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full border"
          >
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
            <option value="Approved">Approved</option>
            <option value="Process">In Process</option>
            <option value="Completed">Completed</option>
          </select>
        ) : (
          <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
            {progress}
          </span>
        )}
      </div>

      {/* Event Date */}
      <p className="text-gray-600 flex items-center gap-2 text-sm mt-1">
        <CalendarRange size={15} />
        {moment(eventDate).format("DD MMM YYYY")}
      </p>

      {/* Event Description */}
      <p className="text-gray-700 mt-4">{Description}</p>

      {/* Event Category */}
      <span className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full mt-2 inline-block">
        {Category}
      </span>

      {/* Services Required */}
      {Services?.length > 0 && (
        <>
          <h3 className="text-gray-800 font-semibold mt-4">Services Required:</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {Services.map((service, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full"
              >
                {service}
              </span>
            ))}
          </div>
        </>
      )}

      <hr className="my-4" />

      {/* Event Manager Details */}
      {EMVDetails && (
        <div className="border flex-col w-full md:w-fit rounded-lg text-gray-800 font-medium text-lg flex p-2 items-center gap-2">
          <div className="flex items-center justify-start gap-2">
            <User className="w-4 h-4 text-gray-600" />
            <p className="text-sm">{EMVDetails?.Name}</p>
          </div>
          <Link
            href={`/UserProfiles/${EMVDetails?.$id}`}
            className="text-sm bg-blue-500 text-white px-10 py-1 text-center rounded-md w-full"
          >
            View Profile
          </Link>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
