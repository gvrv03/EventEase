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
    { icon: <Cake size={24} />, title: "Birthday" },
    { icon: <Heart size={24} />, title: "Anniversary" },
    { icon: <Baby size={24} />, title: "Baby Shower" },
    { icon: <Gift size={24} />, title: "Wedding" },
    { icon: <Theater size={24} />, title: "Stage Decors" },
    { icon: <Camera size={24} />, title: "Pre-wedding" },
    { icon: <Star size={24} />, title: "Graduation" },
    { icon: <RockingChair size={24} />, title: "Retirement" },
    { icon: <Glasses size={24} />, title: "Party" },
    { icon: <User size={24} />, title: "Corporate" },
  ];

  return (
    <section className="flex flex-col gap-8 py-12 px-4 max-w-6xl mx-auto">
      <div className="text-center space-y-3">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
          What are you celebrating?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose from our wide range of celebration themes and let us make your special moment unforgettable
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {celebrations.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 cursor-pointer hover:-translate-y-1 border border-gray-100"
          >
            <div className="mb-4 text-primary-600 bg-primary-50 p-3 rounded-full">
              {item.icon}
            </div>
            <div className="text-base font-medium text-gray-700 text-center">
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CelebrationsSection;
