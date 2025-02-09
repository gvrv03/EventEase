import React from "react";
import Navbar from "../../components/Utility/Navbar";
import Banner from "../../components/Home/Banner";
import Landing from "../../components/Home/Landing";
import EventCard from "@/components/Events/EventCard";
import EventPage from "../Event/page";

const HomePage = () => {
  return (
    <>
      <Banner />
      <Landing />
      <EventPage />
    
    </>
  );
};

export default HomePage;