import React from "react";
import Banner from "../../components/Home/Banner";
import Landing from "../../components/Home/Landing";
import OurEvents from "@/components/Home/OurEvents";
import AIEventCreation from "@/components/Events/AIEventCreation";
import JoinEMV from "@/components/UserProfile/Users/JoinEMV";
import Features from "@/components/Home/Features";
import CreateEventFloatingBtn from "@/components/Utility/CreateEventFloatingBtn";
import ServiceAvailability from "@/components/Location/ServiceAvailability";

const HomePage = () => {
  return (
    <div className="flex pb-20 flex-col gap-5">
      <Banner />
      {/* <ServiceAvailability/> */}
      <Landing />
      <Features />
      <OurEvents />
      <JoinEMV />
      <AIEventCreation />
      <CreateEventFloatingBtn/>
    </div>
  );
};

export default HomePage;
