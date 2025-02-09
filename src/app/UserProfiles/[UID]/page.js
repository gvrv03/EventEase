import MainDetails from "@/components/UserProfile/MVUsersProfile/MainDetails";
import MVAboutUs from "@/components/UserProfile/MVUsersProfile/MVAboutUs";
import MVPastEvents from "@/components/UserProfile/MVUsersProfile/MVPastEvents";
import MVServices from "@/components/UserProfile/MVUsersProfile/MVServices";
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
