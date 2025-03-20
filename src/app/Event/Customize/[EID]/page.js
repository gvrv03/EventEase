"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Stats from "./Components/Stats";
import EventDetails from "./Components/EventDetails";
import EventServices from "./Components/EventServices";
import { useEvents } from "@/Context/EventContext";
import TransactionRecords from "./Components/TransactionRecords";
import { EventChatBot } from "./Components/ChatBot";
import { useAuth } from "@/Context/AuthContext";

const EventCustomize = ({ params }) => {
  const EventID = React.use(params).EID;
  const { loadingSingle, errorSingle, eventSingle, getEventDetails } =
    useEvents();
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const isEventEMV = eventSingle?.EMVDetails?.$id == user?.userData?.$id;
  const isEventUsers = eventSingle?.userDetails?.$id == user?.userData?.$id;

  const refreshData = () => {
    getEventDetails(EventID);
  };

  useEffect(() => {
    if (EventID) {
      getEventDetails(EventID);
      setTimeout(() => setLoading(false), 1500);
    }
  }, [EventID]);

  return (
    <div className="flex md:flex-row gap-2 flex-col justify-between">
      <div className="flex flex-col gap-2 w-full">
        {loading ? (
          <SkeletonLoader className="h-[250px] w-full" />
        ) : (
          <EventDetails />
        )}
        {loading ? (
          <SkeletonLoader className="h-[200px] w-full" />
        ) : (
          (isEventEMV || isEventUsers) && <TransactionRecords />
        )}
      </div>

      <div className="flex w-full flex-col gap-2">
        {loading ? (
          <SkeletonLoader className="h-[120px] w-full" />
        ) : (
          <Stats refreshData={refreshData} />
        )}

        {loading ? (
          <div className="space-y-2">
            <SkeletonLoader className="h-[60px] w-full" />
            <SkeletonLoader className="h-[60px] w-full" />
            <SkeletonLoader className="h-[60px] w-full" />
            <SkeletonLoader className="h-[60px] w-full" />
          </div>
        ) : (
          <EventServices refreshData={refreshData} />
        )}
      </div>
      {(isEventEMV || isEventUsers) && <EventChatBot />}
    </div>
  );
};

export default EventCustomize;

const SkeletonLoader = ({ className }) => {
  return (
    <div className={`animate-pulse bg-gray-300 rounded-md ${className}`}></div>
  );
};
