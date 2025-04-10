import AllBusinessDetails from "@/components/Admin/BusinessVerification/AllBusinessDetails";
import React from "react";

const BusinessVerification = () => {
  return (
    <div>
      <AllBusinessDetails />
    </div>
  );
};

export default BusinessVerification;
export const dynamic = "force-dynamic";
export const revalidate = 0;