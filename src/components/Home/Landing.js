import React from "react";
import {
  Cake,
  Heart,
  Baby,
  Gift,
  Glasses,
  Star,
  RockingChair,
  Theater,
  Camera,
  User,
} from "lucide-react";

const CelebrationsSection = () => {
  const celebrations = [
    { icon: <Cake size={20} />, title: "Birthday" },
    { icon: <Heart size={20} />, title: "Anniversary" },
    { icon: <Gift size={20} />, title: "Welcome Baby" },
    { icon: <Theater size={20} />, title: "Stage Decors" },
    { icon: <Camera size={20} />, title: "Pre-wedding Decors" },
  ];

  return (
    <section className="flex-col flex gap-2">
      <h2 className="text-xl md:text-2xl font-semibold text-center ">
        What are you celebrating?
      </h2>
      {/* First Row - 5 Items */}
      <div className="flex gap-2 overflow-x-scroll">
        {celebrations.map((item, index) => (
          <div
            key={index}
            className="  rounded-md  w-full min-w-fit bg-white  p-5  flex flex-col items-center"
          >
            <div className=" mb-2">{item.icon}</div>
            <div className="text-base  text-center">{item.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CelebrationsSection;
