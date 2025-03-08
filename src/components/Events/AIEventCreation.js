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
    <div className="w-full p-1 bg-gradient-to-t from-white via-white to-transparent mt-4">
      <div className="max-w-[800px] mx-auto">
        <form onSubmit={sendMessage} className="relative group">
          <div className="w-full flex items-center gap-2 rounded-xl p-1 px-7 border-2 border-gray-200 bg-white shadow-lg hover:border-blue-400 transition-all duration-300 focus-within:border-blue-500 focus-within:shadow-blue-100">
            <Sparkles className="text-blue-500" size={22} />
            <input
              placeholder="Describe your event idea..."
              className="outline-none p-3 w-full text-gray-700 placeholder-gray-400"
              type="text"
            />
            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <Brain size={18} />
              <span>Generate</span>
            </button>
          </div>
        </form>
        <p className="text-xs text-gray-400 text-center mt-2">
          Powered by AI - Create amazing events with a simple description
        </p>
      </div>
    </div>
  );
};

export default AIEventCreation;
