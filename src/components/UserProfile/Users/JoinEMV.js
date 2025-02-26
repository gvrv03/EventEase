"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const JoinEMV = () => {
    const [showBusinessForm, setShowBusinessForm] = useState(false);
  return (
    <>
      <div className="p-2  bg-white border border-blue-200 rounded-md flex-col items-center justify-center flex ">
        <div className="text-center py-2">
          Join as{" "}
          <span className="text-blue-500 font-semibold">
            Event Manager / Vendors
          </span>{" "}
        </div>

        <button 
        onClick={() => setShowBusinessForm(!showBusinessForm)}className="font-semibold text-sm border px-5 py-2 rounded-md text-blue-500 text-center">
          Join Now
        </button>

      </div>
      {showBusinessForm && <SubmitBusinessProof />}
    </>
  );
};

export default JoinEMV;



const SubmitBusinessProof = () => {
    return (
      <div className="mt-2 p-2 border rounded-md bg-gray-50">
        <h4 className="text-lg font-semibold">Submit Business Details</h4>
        <div className="space-y-2 mt-2">
          <div>
            <label className="block text-sm font-medium">Select Role</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="event_manager">Event Manager</SelectItem>
                <SelectItem value="vendor">Vendor</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium">Business Name</label>
            <Input type="text" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Business Category</label>
            <Input type="text" required />
          </div>
          <div>
            <label className="block text-sm font-medium">GSTIN</label>
            <Input type="text" />
          </div>
          <div>
            <label className="block text-sm font-medium">Upload Business Proof</label>
            <Input type="file" />
          </div>
          <Button className="w-full bg-green-500 hover:bg-green-600 text-white mt-2">Submit</Button>
        </div>
      </div>
    );
  };