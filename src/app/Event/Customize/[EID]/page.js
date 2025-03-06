"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import Stats from "./Components/Stats";
import EventDetails from "./Components/EventDetails";
import EventServices from "./Components/EventServices";
import { useEvents } from "@/Context/EventContext";

const EventCustomize = ({ params }) => {
  const EventID = React.use(params).EID;
  const { loadingSingle, errorSingle, getEventDetails } = useEvents();

  useEffect(() => {
    EventID && getEventDetails(EventID);
  }, [EventID, getEventDetails]);

  return (
    <div className="flex md:flex-row gap-2 flex-col justify-between ">
      <EventDetails />
      <div className="flex w-full flex-col gap-2">
        <Stats />
        <EventServices />
      </div>
    </div>
  );
};

export default EventCustomize;
