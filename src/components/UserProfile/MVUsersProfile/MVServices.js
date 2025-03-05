"use client";
import { UsersCollection } from "@/config/appwrite";
import { useAuth } from "@/Context/AuthContext";
import { UpdateCollectionData } from "@/Services/Appwrite";
import React, { useState } from "react";
import toast from "react-hot-toast";

const MVServices = ({ userID }) => {
  const { user, EMVDetails, setEMVDetails } = useAuth(); // Ensure setEMVDetails exists
  const [addingService, setAddingService] = useState(false);
  const [removingService, setRemovingService] = useState(null);
  const [newService, setNewService] = useState("");

  const handleAddService = async () => {
    if (!newService.trim() || addingService) return;
    setAddingService(true);

    try {
      const updatedServices = [...(EMVDetails?.Services || []), newService];

      await UpdateCollectionData(UsersCollection, userID, {
        Services: updatedServices,
      });

      // Update local state
      setEMVDetails((prev) => ({ ...prev, Services: updatedServices }));

      setNewService("");
      toast.success("Service added successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setAddingService(false);
    }
  };

  const handleRemoveService = async (serviceToRemove) => {
    if (removingService !== null) return;
    setRemovingService(serviceToRemove);

    try {
      const updatedServices = EMVDetails?.Services?.filter(
        (service) => service !== serviceToRemove
      );

      await UpdateCollectionData(UsersCollection, userID, {
        Services: updatedServices,
      });

      // Update local state
      setEMVDetails((prev) => ({ ...prev, Services: updatedServices }));

      toast.success("Service removed successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setRemovingService(null);
    }
  };

  return (
    <div className="flex flex-col gap-2 bg-white border border-gray-100 p-2 md:p-5 md:rounded-md">
      <h3 className="font-semibold text-xl md:text-2xl">Services</h3>

      {userID === user?.userData?.$id && (
        <div className="flex gap-2">
          <input
            type="text"
            value={newService}
            onChange={(e) => setNewService(e.target.value)}
            className="border border-gray-300 p-2 rounded-md flex-1 text-sm md:text-lg"
            placeholder="Add a new service..."
            disabled={addingService}
          />
          <button
            onClick={handleAddService}
            disabled={addingService}
            className="bg-blue-500 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
          >
            {addingService ? "Adding..." : "Add"}
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {EMVDetails?.Services?.map((service, index) => (
          <div
            key={index}
            className="border border-gray-200 text-sm p-2 rounded-md flex justify-between items-center"
          >
            <span>{service}</span>
            <button
              onClick={() => handleRemoveService(service)}
              disabled={removingService === service}
              className="text-red-500 text-xs px-2 py-1 rounded-md hover:bg-red-100 disabled:text-gray-400"
            >
              {removingService === service ? "Removing..." : "✕"}
            </button>
          </div>
        ))}
      </div>
      {!(EMVDetails?.Services?.length > 0) && (
        <div className="text-gray-500">No Services Found</div>
      )}
    </div>
  );
};

export default MVServices;
