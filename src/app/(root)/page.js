import React from "react";
import Navbar from "../../components/Utility/Navbar";
import Banner from "../../components/Home/Banner";
import Landing from "../../components/Home/Landing";
import EventCard from "@/components/Events/EventCard";
import EventPage from "../Event/page";
import OurEvents from "@/components/Home/OurEvents";
import AIEventCreation from "@/components/Events/AIEventCreation";
import JoinEMV from "@/components/UserProfile/Users/JoinEMV";

const HomePage = () => {
  return (
    <div className="flex pb-20 flex-col gap-5">
      <Banner />
      <Landing />

      <OurEvents />
      <JoinEMV />
      <AIEventCreation />
    </div>
  );
};

export default HomePage;
