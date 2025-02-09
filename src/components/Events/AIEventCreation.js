import { Brain, Sparkles } from "lucide-react";
import React from "react";

const AIEventCreation = () => {
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
