import MainDetails from "@/Components/UserProfile/MVUsersProfile/MainDetails";
import MVAboutUs from "@/Components/UserProfile/MVUsersProfile/MVAboutUs";
import MVPastEvents from "@/Components/UserProfile/MVUsersProfile/MVPastEvents";
import MVServices from "@/Components/UserProfile/MVUsersProfile/MVServices";
import React from "react";

const MangersVendorsProfiles = () => {
  return (
    <div className="flex-col flex gap-2 md:gap-5" >
      <MainDetails />
      <MVAboutUs/>
      <MVServices/>
      <MVPastEvents/>
    </div>
  );
};

export default MangersVendorsProfiles;
