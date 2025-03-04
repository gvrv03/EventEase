import { Calendar, MessageSquare, ShoppingBag } from "lucide-react";
import React from "react";

const Features = () => {
  return (
    <section className=" ">
      <h2 className="mb-12 text-center  font-bold tracking-tight text-lg md:text-2xl ">
        Everything You Need for Successful Events
      </h2>
      <div className="grid gap-5 grid-cols-1 md:grid-cols-3">
        <div className="flex flex-col items-center text-center ">
          <div className="mb-4 rounded-full bg-primary/10 p-4">
            <Calendar className="h-8 w-8 text-primary" />
          </div>
          <h3 className="mb-2  font-semibold">Event Manager Listings</h3>
          <p className="text-muted-foreground">
            Find and connect with professional event managers with verified
            portfolios and reviews.
          </p>
        </div>
        <div className="flex flex-col items-center text-center ">
          <div className="mb-4 rounded-full bg-primary/10 p-4">
            <ShoppingBag className="h-8 w-8 text-primary" />
          </div>
          <h3 className="mb-2  font-semibold">Vendor Marketplace</h3>
          <p className="text-muted-foreground">
            Discover trusted vendors for catering, decor, entertainment, and
            everything you need.
          </p>
        </div>
        <div className="flex flex-col items-center text-center ">
          <div className="mb-4 rounded-full bg-primary/10 p-4">
            <MessageSquare className="h-8 w-8 text-primary" />
          </div>
          <h3 className="mb-2  font-semibold">Community Platform</h3>
          <p className="text-muted-foreground">
            Join discussions, share ideas, and learn from other event
            professionals and enthusiasts.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
