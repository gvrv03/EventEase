"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  AppwriteDatabase,
  EventCreationCollection,
  ID,
} from "@/config/appwrite";
import { useAuth } from "@/Context/AuthContext";
import { AddDataToCollection, UpdateCollectionData } from "@/Services/Appwrite";
import { Permission, Role } from "appwrite";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EventCreate = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    EventName: "",
    Description: "",
    Category: "",
    eventDate: "",
    Services: [],
    EMVDetails: null,
  });
  const [providerType, setProviderType] = useState("");
  const [creatingEvent, setCreatingEvent] = useState(false);
  const [EMV, setEMV] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle select changes
  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVendorSelect = (vendorId) => {
    setFormData((prev) => ({
      ...prev,
      EMVDetails: vendorId,
    }));
  };

  // Handle facility checkbox changes
  const handleFacilityChange = (facility) => {
    setFormData((prev) => {
      const facilities = prev.Services.includes(facility)
        ? prev.Services.filter((f) => f !== facility)
        : [...prev.Services, facility];

      return {
        ...prev,
        Services: facilities,
      };
    });
  };

  useEffect(() => {
    const fetchEMV = async () => {
      setIsLoading(true);
      setError(null); // Reset error state before new request
      try {
        const res = await fetch("/api/GetEMV", {
          method: "POST",
          body: JSON.stringify({ providerType: providerType }),
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch providers: ${res.statusText}`);
        }

        const data = await res.json();
        setEMV(data);
      } catch (err) {
        setError(err.message);
        setEMV([]); // Reset EMV data on error
      } finally {
        setIsLoading(false);
      }
    };
    if (providerType) {
      fetchEMV();
    }
  }, [providerType]);

  const handleEventCreate = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.EventName ||
      !formData.Description ||
      !formData.Category ||
      !formData.eventDate ||
      !formData.EMVDetails ||
      formData.Services.length === 0
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setCreatingEvent(true);

      // Set up permissions properly
      const permissions = [
        // Permission.update(Role.user(formData?.EMVDetails)),
        Permission.update(Role.user(user?.userData?.$id)),
        Permission.read(Role.user(user?.userData?.$id)),
        Permission.delete(Role.user(user?.userData?.$id)),
      ];

      await AppwriteDatabase.createDocument(
        process.env.NEXT_PUBLIC_DATABASEID,
        EventCreationCollection,
        ID.unique(),
        { ...formData, userDetails: user?.userData?.$id },
        permissions
      );

      toast.success("Event Created Successfully");

      // Reset form
      setFormData({
        EventName: "",
        Description: "",
        Category: "",
        eventDate: "",
        Services: [],
        EMVDetails: null,
      });
      setProviderType("");
    } catch (error) {
      console.error("Event creation error:", error);
      toast.error(error.message || "Failed to create event");
    } finally {
      setCreatingEvent(false);
    }
  };

  return (
    <div className="bg-white p-2 rounded-lg mt-2 md:max-w-[50%] mx-auto">
      <h3 className="font-semibold text-lg md:text-xl">Create your Event</h3>
      <form onSubmit={handleEventCreate} className="flex-col flex gap-2 mt-2">
        <div className="flex flex-col gap-2">
          <Label>Event Name</Label>
          <Input
            type="text"
            name="EventName"
            value={formData.EventName}
            onChange={handleInputChange}
            className="bg-white"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Describe your Event</Label>
          <Textarea
            name="Description"
            value={formData.Description}
            onChange={handleInputChange}
            className="bg-white"
          />
        </div>

        <div className="gap-2 grid grid-cols-1 md:grid-cols-2 ">
          <div className="flex flex-col w-full gap-2">
            <Label>Select Provider Type</Label>
            <Select onValueChange={(value) => setProviderType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EventManager">Event Manager</SelectItem>
                <SelectItem value="Vendor">Vendor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col w-full gap-2">
            <Label>Event Category</Label>
            <Select
              onValueChange={(value) => handleSelectChange("Category", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Event" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="birthday">Birthday</SelectItem>
                <SelectItem value="freshers">Freshers Party</SelectItem>
                <SelectItem value="wedding">Wedding</SelectItem>
                <SelectItem value="corporate">Corporate Event</SelectItem>
                <SelectItem value="anniversary">Anniversary</SelectItem>
                <SelectItem value="welcome_baby">Welcome Baby</SelectItem>
                <SelectItem value="stage_decor">Stage Decor</SelectItem>
                <SelectItem value="pre_wedding">Pre-wedding Decor</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col w-full gap-2">
            <Label>Event Date</Label>
            <Input
              type="date"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <Label>Select Facility</Label>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
            {[
              "Photography",
              "Decoration",
              "Firework",
              "Sound System",
              "Water Supply",
              "Art & Craft",
              "Lighting Setup",
              "Stage Setup",
              "Catering",
              "Security",
              "Live Streaming",
              "Event Hosting",
              "Transportation",
              "Ticketing & Registration",
              "VIP Lounge",
              "First Aid Services",
            ].map((service, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Input
                  className="w-3"
                  type="checkbox"
                  checked={formData.Services.includes(service)}
                  onChange={() => handleFacilityChange(service)}
                />
                <p className="text-xs text-gray-700">{service}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-col flex gap-2">
          <Label>Select {formData.providerType}</Label>
          <div className="w-full flex gap-2 overflow-x-scroll">
            {isLoading ? (
              <LoadingSkeleton />
            ) : error ? (
              <div className="text-center w-full py-4 text-red-500">
                {error}. Please try again later.
              </div>
            ) : EMV?.users?.length > 0 ? (
              EMV.users.map((item, index) => (
                <div
                  key={index}
                  className={`p-2  border rounded-lg max-w-[200px] min-w-[200px] ${
                    formData.EMVDetails === item.$id
                      ? "bg-blue-50 border-blue-500"
                      : ""
                  }`}
                >
                  <h5 className="text-sm">{item.name}</h5>
                  <p className="text-[10px] flex gap-1 px-1 w-fit text-red-600">
                    {item?.labels?.map((label, index) => (
                      <span key={index}>{label}</span>
                    ))}
                  </p>
                  <div className="flex gap-2">
                    <Link
                      href={`/UserProfiles/${item.$id}`}
                      target="_blank"
                      className="text-xs  bg-blue-500  w-full text-center font-semibold text-white rounded-md py-1 "
                    >
                      Profile
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleVendorSelect(item.$id)}
                      className={`w-full text-xs border rounded-md py-1 ${
                        formData.EMVDetails === item.$id
                          ? "bg-blue-500 text-white font-semibold border-blue-500"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      {formData.EMVDetails === item.$id ? "Selected" : "Select"}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className=" text-sm text-center w-full py-4 text-gray-500">
                No providers found
              </div>
            )}
          </div>
        </div>
        <Button
          type="submit"
          className="bg-blue-500 text-white"
          disabled={creatingEvent}
        >
          {creatingEvent ? "Creating Event..." : "Create Event"}
        </Button>
      </form>
    </div>
  );
};

export default EventCreate;

const LoadingSkeleton = () => (
  <>
    {[1, 2, 3, 4].map((item) => (
      <div
        key={item}
        className="p-2 border rounded-lg max-w-[200px] min-w-[200px] animate-pulse"
      >
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-2 bg-gray-200 rounded w-1/2 mb-3"></div>
        <div className="h-6 bg-gray-200 rounded w-full"></div>
      </div>
    ))}
  </>
);
