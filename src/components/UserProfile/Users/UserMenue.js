import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Ticket, Package } from "lucide-react";

const UserMenu = () => {
  return (
    <div className="grid grid-cols-2 gap-2  rounded-md">
      <Button className="w-full bg-white hover:bg-gray-100 shadow-md  text-gray-800 font-semibold uppercase flex justify-start items-center gap-2">
        <ShoppingCart size={16} /> Cart
      </Button>
      <Button className="w-full bg-white hover:bg-gray-100 shadow-md  text-gray-800 font-semibold uppercase flex justify-start items-center gap-2">
        <Heart size={16} /> Wishlist
      </Button>
      <Button className="w-full bg-white hover:bg-gray-100 shadow-md  text-gray-800 font-semibold uppercase flex justify-start items-center gap-2">
        <Ticket size={16} /> Coupons
      </Button>
      <Button className="w-full bg-white hover:bg-gray-100 shadow-md  text-gray-800 font-semibold uppercase flex justify-start items-center gap-2">
        <Package size={16} /> Orders
      </Button>
    </div>
  );
};

export default UserMenu;
