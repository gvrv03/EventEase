"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const EventCard = ({
  title,
  imageUrl,
  originalPrice,
  discountedPrice,
  category,
  vendorName,
  vendorProfile,
  eventManagerName,
  eventManagerProfile,
}) => {
  const Router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  return (
    <Card
      onClick={() => {
        Router.push("/Event/dsfjhgsjdhfgjhsdgf");
      }}
      className=" flex-col flex justify-between gap-2 group p-2"
    >
      <div className="relative  aspect-square overflow-hidden">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-2 right-2 size-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition-all hover:bg-white"
        >
          <Heart
            className={`size-5 transition-colors ${
              isFavorite ? "fill-red-500 stroke-red-500" : "stroke-gray-600"
            }`}
          />
        </button>
      </div>
      <div className="">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-2">Category: {category}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold">
            ₹{discountedPrice.toLocaleString()}
          </span>
          <span className="text-sm text-muted-foreground line-through">
            ₹{originalPrice.toLocaleString()}
          </span>
        </div>
      </div>

      <div className=" flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Image
            src={vendorProfile}
            alt={vendorName}
            width={32}
            height={32}
            className="rounded-full"
          />
          <p className="text-sm font-medium">{vendorName}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Image
            src={eventManagerProfile}
            alt={eventManagerName}
            width={32}
            height={32}
            className="rounded-full"
          />
          <p className="text-sm font-medium">{eventManagerName}</p>
        </div>
      </div>
    </Card>
  );
};

export default EventCard;
