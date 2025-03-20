"use client";
import { EventCreationCollection } from "@/config/appwrite";
import { useEvents } from "@/Context/EventContext";
import { UpdateCollectionData } from "@/Services/Appwrite";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/Context/AuthContext";

const EventServices = ({ refreshData }) => {
  const { eventSingle } = useEvents();
  const { user } = useAuth();
  const [arrAmount, setArrAmount] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedPrice, setEditedPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const isEMVEditable = eventSingle?.EMVDetails?.$id === user?.userData?.$id;

  useEffect(() => {
    if (eventSingle?.Budget) {
      setArrAmount(eventSingle.Budget.map(Number));
    }
  }, [eventSingle]);

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedPrice(arrAmount[index]?.toString() || "");
  };

  const handleSave = async (index) => {
    if (!editedPrice.trim() || isNaN(Number(editedPrice))) {
      return toast.error("Price must be a valid number");
    }
    setLoading(true);
    try {
      const updatedPrices = [...arrAmount];
      updatedPrices[index] = Number(editedPrice);
      setArrAmount(updatedPrices);
      setEditingIndex(null);
      await UpdateCollectionData(EventCreationCollection, eventSingle?.$id, {
        Budget: updatedPrices,
      });

      toast.success("Price updated successfully");
      refreshData();
    } catch (error) {
      toast.error(error?.message || "Failed to update price");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full">
      <h2 className="text-lg font-bold mb-4">Services Offered</h2>
      <div className="mt-4">
        {eventSingle?.Services?.map((service, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-3 rounded-md border border-gray-200 mb-2"
          >
            <span className="text-gray-700 font-medium">{service}</span>
            <div className="flex items-center gap-2">
              {editingIndex === index ? (
                <input
                  type="number"
                  value={editedPrice}
                  onChange={(e) => setEditedPrice(e.target.value)}
                  className="p-1 border rounded-md w-20 text-center"
                />
              ) : (
                <span className="text-gray-700 font-medium">
                  ₹{arrAmount[index] || "0"}
                </span>
              )}
              {isEMVEditable &&
                (editingIndex === index ? (
                  <button
                    onClick={() => handleSave(index)}
                    className={`bg-green-500 text-white px-2 py-1 rounded-md ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-blue-500 text-white px-2 py-1 rounded-md"
                  >
                    Edit
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventServices;
