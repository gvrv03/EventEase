import { EventProvider } from "@/Context/EventContext";
import React from "react";

const layout = ({ children }) => {
  return <EventProvider>{children}</EventProvider>;
};
export default layout;
