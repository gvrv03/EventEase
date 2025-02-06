import React from "react";

const MVServices = () => {
  return (
    <div className=" flex-col flex gap-2 bg-white border border-gray-100 p-2 md:p-5 md:rounded-md">
      <h3 className="font-semibold text-xl md:text-2xl" >Services</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2  " >
        <p className="border border-gray-200 text-sm p-2 rounded-md" >Event Planning and Consultation</p>
        <p className="border border-gray-200 text-sm p-2 rounded-md" >Budget Planning and Management</p>
        <p className="border border-gray-200 text-sm p-2 rounded-md" >Vendor Selection and Coordination</p>
        <p className="border border-gray-200 text-sm p-2 rounded-md" >Logistics Management</p>
        <p className="border border-gray-200 text-sm p-2 rounded-md" >Real-Time Event Updates</p>
        <p className="border border-gray-200 text-sm p-2 rounded-md" >AI-Powered Assistance</p>
        <p className="border border-gray-200 text-sm p-2 rounded-md" >Event Execution</p>
        <p className="border border-gray-200 text-sm p-2 rounded-md" >Post-Event Feedback and Analytics</p>
        <p className="border border-gray-200 text-sm p-2 rounded-md" >Hybrid and Virtual Event Support</p>
      </div>
    </div>
  );
};

export default MVServices;
