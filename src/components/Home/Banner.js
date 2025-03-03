"use client";

import React, { useEffect, useState } from "react";

const images = [
  "https://img.ebonow.com/Posters/P1B.webp",
  "https://img.ebonow.com/Posters/P1C.webp",
  "https://img.ebonow.com/Posters/P1D.webp",
  "https://img.ebonow.com/Posters/P1F.webp",
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative  w-full bg-white  p-5 h-[200px] md:h-[400px] overflow-hidden">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Banner ${index + 1}`}
          className={`splide  h-full w-full splide--loop splide--ltr splide--draggable is-active is-overflow is-initialized absolute inset-0  rounded-lg object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
};

export default Banner;
