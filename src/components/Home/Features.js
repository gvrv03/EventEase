import { Calendar, MessageSquare, ShoppingBag } from "lucide-react";
import React from "react";

const Features = () => {
  return (
    <section className="py-1 mx-auto">
      <h2 className="mb-16 text-center font-bold tracking-tight text-2xl md:text-4xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
        Everything You Need for Successful Events
      </h2>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
        {[
          {
            icon: <Calendar className="h-8 w-8 text-primary" />,
            title: "Event Manager Listings",
            description:
              "Find and connect with professional event managers with verified portfolios and reviews.",
          },
          {
            icon: <ShoppingBag className="h-8 w-8 text-primary" />,
            title: "Vendor Marketplace",
            description:
              "Discover trusted vendors for catering, decor, entertainment, and everything you need.",
          },
          {
            icon: <MessageSquare className="h-8 w-8 text-primary" />,
            title: "Community Platform",
            description:
              "Join discussions, share ideas, and learn from other event professionals and enthusiasts.",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="group flex flex-col items-center text-center p-6 rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 bg-card"
          >
            <div className="mb-6 rounded-full bg-primary/10 p-5 group-hover:bg-primary/20 transition-colors duration-300">
              {feature.icon}
            </div>
            <h3 className="mb-3 text-xl font-semibold group-hover:text-primary transition-colors duration-300">
              {feature.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
