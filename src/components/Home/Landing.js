import React from "react";
import { Cake, Heart, Baby, Gift, Glasses, Star, RockingChair, Theater, Camera, User } from 'lucide-react';

const CelebrationsSection = () => {
  const celebrations = [
    { icon: <Cake size={50} />, title: 'Birthday' },
    { icon: <Heart size={50} />, title: 'Anniversary' },
    { icon: <User size={50} />, title: "Kid's Party" },
    { icon: <Baby size={50} />, title: 'Baby Shower' },
    { icon: <Gift size={50} />, title: 'Welcome Baby' },
    { icon: <Glasses size={50} />, title: 'Bachelorette' },
    { icon: <Star size={50} />, title: 'Premium Decors' },
    { icon: <RockingChair size={50} />, title: 'Candlelight & Proposal Decors' },
    { icon: <Theater size={50} />, title: 'Stage Decors' },
    { icon: <Camera size={50} />, title: 'Pre-wedding Decors' },
  ];

  return (
    <section className="py-3 p-2">
      <h2 className="text-2xl font-semibold text-center mb-6">What are you celebrating?</h2>

      {/* First Row - 5 Items */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 px-3">
        {celebrations.slice(0, 5).map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="mb-2">{item.icon}</div>
            <div className="text-center">{item.title}</div>
          </div>
        ))}
      </div>

      {/* Second Row - 5 Items */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 px-3 mt-4">
        {celebrations.slice(5).map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="mb-2">{item.icon}</div>
            <div className="text-center">{item.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CelebrationsSection;
