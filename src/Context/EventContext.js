"use client";
import { EventCreationCollection } from "@/config/appwrite";
import { GetSingleDocument } from "@/Services/Appwrite";
import { createContext, useState, useEffect, useContext } from "react";

const EventContext = createContext();
export const EventProvider = ({ children }) => {
  const [eventSingle, setEventSingle] = useState({});
  const [loadingSingle, setLoadingSingle] = useState(false);
  const [errorSingle, setErrorSingle] = useState(null);

  const getEventDetails = async (EID) => {
    try {
      setLoadingSingle(true);
      const res = await GetSingleDocument(EID, EventCreationCollection);
      setEventSingle(res);
    } catch (error) {
      setErrorSingle(error?.message);
    } finally {
      setLoadingSingle(false);
    }
  };

  const contextData = {
    eventSingle,
    loadingSingle,
    errorSingle,
    getEventDetails,
  };
  return (
    <EventContext.Provider value={contextData}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => useContext(EventContext);
