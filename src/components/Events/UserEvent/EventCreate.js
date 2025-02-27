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
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import React, { useState } from "react";

const EventCreate = () => {
  const [selectedDate, setSelectedDate] = useState(null);

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

        <div className="flex gap-2 md:flex-row flex-col">
          <div className="flex flex-col w-full gap-2">
            <Label>Select Service</Label>
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
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  {selectedDate ? (
                    format(selectedDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date("1900-01-01")}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
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
