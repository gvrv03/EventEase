"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  EventCreationCollection,
} from "@/config/appwrite";
import { useAuth } from "@/Context/AuthContext";
import { useEvents } from "@/Context/EventContext";
import { UpdateCollectionData } from "@/Services/Appwrite";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EventNotification = ({ refreshData }) => {
  const [notifications, setNotifications] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [adding, setAdding] = useState(false);
  const [removingIndex, setRemovingIndex] = useState(null);
  const { user } = useAuth();
  const { eventSingle } = useEvents();

  const isEMVEditable = eventSingle?.EMVDetails?.$id === user?.userData?.$id;

  useEffect(() => {
    if (eventSingle?.Notification) {
      setNotifications(eventSingle.Notification);
    }
  }, [eventSingle]);

  const addNotification = async () => {
    if (inputValue.trim() === "") return;
    setAdding(true);
    try {
      const updatedNotifications = [...notifications, inputValue];
      await UpdateCollectionData(EventCreationCollection, eventSingle?.$id, {
        Notification: updatedNotifications,
      });
      setNotifications(updatedNotifications);
      setInputValue("");
      refreshData();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setAdding(false);
    }
  };

  const removeNotification = async (index) => {
    setRemovingIndex(index);
    try {
      const updatedNotifications = notifications.filter((_, i) => i !== index);
      await UpdateCollectionData(EventCreationCollection, eventSingle?.$id, {
        Notification: updatedNotifications,
      });
      setNotifications(updatedNotifications);
      refreshData();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setRemovingIndex(null);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Notifications</h2>
      {isEMVEditable && (
        <div className="flex gap-2 mb-4">
          <Input
            type="text"
            className="w-full border-gray-300 focus:ring focus:ring-indigo-200 rounded-lg"
            placeholder="Enter a notification..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={adding}
          />
          <Button
            onClick={addNotification}
            disabled={adding}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
          >
            {adding ? "Adding..." : "Add"}
          </Button>
        </div>
      )}
      <ul className="space-y-2">
        {notifications.map((notification, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm border border-gray-200"
          >
            <span className="text-gray-700">{notification}</span>
            {isEMVEditable && (
              <Button
                onClick={() => removeNotification(index)}
                variant="destructive"
                disabled={removingIndex === index}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
              >
                {removingIndex === index ? "Removing..." : "Remove"}
              </Button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventNotification;