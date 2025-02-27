"use client";
import { Brain, Sparkles } from "lucide-react";
import React from "react";

const AIEventCreation = () => {
  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek-r1:1.5b", 
          prompt: "How are you mam!",
          stream: false,
        }),
      });

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full p-2 flex items-center justify-center">
      <div className="w-full flex items-center md:max-w-[600px] rounded-full p-1 px-2 border border-gray-200 bg-white">
        <Sparkles className="text-gray-400" size={20} />
        <input
          placeholder="Create your event with AI (Describe Here)"
          className=" outline-none p-2  w-full "
          type="text"
        />
      </div>
    </div>
  );
};

export default AIEventCreation;
