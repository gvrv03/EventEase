import EditProfile from "@/components/UserProfile/Users/EditProfile";
import JoinEMV from "@/components/UserProfile/Users/JoinEMV";
import UserMenue from "@/components/UserProfile/Users/UserMenue";
import React from "react";

const UserProfiles = () => {
  return (
    <div className="md:max-w-[50%] m-auto " >
      <UserMenue/>
      <EditProfile />
      <JoinEMV/>
    </div>
  );
};

export default UserProfiles;
