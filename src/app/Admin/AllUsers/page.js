import AllUsersFetch from "@/components/Admin/BusinessVerification/AllUsersFetch";
import React from "react";

const AllUsers = () => {
  return (
    <div>
      <AllUsersFetch />
    </div>
  );
};



export default AllUsers;
export const dynamic = "force-dynamic";
export const revalidate = 0;