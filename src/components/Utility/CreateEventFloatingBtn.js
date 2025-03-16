"use client"
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const CreateEventFloatingBtn = () => {
    const router = useRouter()
  return (
    <div className="z-40 fixed bottom-5 right-5">
      <button onClick={()=>{
        router.push("/Event/EventCreation")
      }} className="px-5 py-2 rounded-full font-semibold flex gap-2 items-center justify-center  text-white bg-blue-500">
        <Plus />
        <p>Create Event</p>
      </button>
    </div>
  );
};

export default CreateEventFloatingBtn;
