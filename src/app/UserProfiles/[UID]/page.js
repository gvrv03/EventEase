<<<<<<< HEAD
import MainDetails from "@/Components/UserProfile/MVUsersProfile/MainDetails";
import MVAboutUs from "@/Components/UserProfile/MVUsersProfile/MVAboutUs";
import MVPastEvents from "@/Components/UserProfile/MVUsersProfile/MVPastEvents";
import MVServices from "@/Components/UserProfile/MVUsersProfile/MVServices";
import Navbar from "@/Components/Utility/Navbar";
=======
import MainDetails from "@/components/UserProfile/MVUsersProfile/MainDetails";
import MVAboutUs from "@/components/UserProfile/MVUsersProfile/MVAboutUs";
import MVPastEvents from "@/components/UserProfile/MVUsersProfile/MVPastEvents";
import MVServices from "@/components/UserProfile/MVUsersProfile/MVServices";
>>>>>>> Pranay
import React from "react";

const MangersVendorsProfiles = () => {
  return (
    <div className="flex-col flex gap-2 md:gap-5">
      <div className="flex  md:flex-row flex-col gap-2 md:gap-5">
        <MainDetails />
        <MVAboutUs />
      </div>
      <MVPastEvents />
      <MVServices />
    </div>
  );
};

export default MangersVendorsProfiles;
