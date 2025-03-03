"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

const EventCreate = () => {
  return (
    <div className="bg-white p-2 rounded-lg mt-2 md:max-w-[50%] mx-auto">
      <h3 className="font-semibold text-lg md:text-xl">Create your Event</h3>
      <form className="flex-col flex gap-2 mt-2">
        <div className="flex flex-col gap-2">
          <Label>Event Name</Label>
          <Input type="text" className="bg-white" />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Describe your Event</Label>
          <Textarea className="bg-white" />
        </div>

        <div className="gap-2 grid grid-cols-1 md:grid-cols-2 ">
          <div className="flex flex-col w-full gap-2">
            <Label>Select Provider Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="event_manager">Event Manager</SelectItem>
                <SelectItem value="vendor">Vendor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col w-full gap-2">
            <Label>Event Category</Label>
            <Select>
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
            <Input type="Date" />
          </div>
          <div className="flex flex-col w-full gap-2">
            <Label>Approx. Budget (₹) </Label>
            <Input type="number" />
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
                <Input className="w-3" type="checkbox" />
                <p className="text-xs text-gray-700">{service}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-col flex gap-2">
          <Label>Select Vendor/Event Manager</Label>
          <div className="w-full  flex gap-2 overflow-x-scroll ">
            <div className="p-2 border rounded-lg max-w-[200px] min-w-[200px] ">
              <h5 className="text-sm">Gaurav Narnaware</h5>
              <p className="text-[10px] px-1 w-fit text-red-600">
                Event Manager
              </p>
              <button className="w-full text-xs border rounded-md py-1">
                Select
              </button>
            </div>
            <div className="p-2 border rounded-lg max-w-[200px] min-w-[200px] ">
              <h5 className="text-sm">Gaurav Narnaware</h5>
              <p className="text-[10px] px-1 w-fit text-red-600">
                Event Manager
              </p>
              <button className="w-full text-xs border rounded-md py-1">
                Select
              </button>
            </div>

            <div className="p-2 border rounded-lg max-w-[200px] min-w-[200px] ">
              <h5 className="text-sm">Gaurav Narnaware</h5>
              <p className="text-[10px] px-1 w-fit text-red-600">
                Event Manager
              </p>
              <button className="w-full text-xs border rounded-md py-1">
                Select
              </button>
            </div>

            <div className="p-2 border rounded-lg max-w-[200px] min-w-[200px] ">
              <h5 className="text-sm">Gaurav Narnaware</h5>
              <p className="text-[10px] px-1 w-fit text-red-600">
                Event Manager
              </p>
              <button className="w-full text-xs border rounded-md py-1">
                Select
              </button>
            </div>
          </div>
        </div>
        <div>
          <Label>Upload Decoration Idea (Optional)</Label>
          <Input type="file" />
        </div>
        <Button className="bg-blue-500 text-white">Create Event</Button>
      </form>
    </div>
  );
};

export default EventCreate;
