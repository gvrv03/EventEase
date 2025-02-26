"use client";

import { Heart, MapPin, Menu, Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useRouter } from "next/navigation";

// Sample menu items - replace with your actual menu structure
const menuItems = [
  {
    title: "Birthday Decorations",
    href: "/birthday-decorations",
  },
  {
    title: "Party Supplies",
    href: "/party-supplies",
  },
  {
    title: "Balloons",
    href: "/balloons",
  },
  {
    title: "Theme Parties",
    href: "/theme-parties",
  },
  {
    title: "Gift Items",
    href: "/gift-items",
  },
  {
    title: "Cake & Desserts",
    href: "/cake-desserts",
  },
];

export default function Navbar() {
  const router = useRouter();

  return (
    <header className="sticky  bg-white  top-0 z-50 w-full border-b bg-background">
      <div className="flex gap-2 m-auto items-center p-2">
      {/* <div className="container flex gap-2 m-auto items-center p-2"> */}
        {/* Mobile Menu Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="mr-2 border md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] px-2 sm:w-[350px]">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            {/* Mobile Location Selector */}
            <div className="flex items-center space-x-2 border-b py-4">
              <MapPin className="h-4 w-4" />
              <div className="flex flex-col">
                <span className="text-sm font-medium">Mumbai</span>
                <span className="text-xs text-muted-foreground">
                  Mumbai city
                </span>
              </div>
            </div>
            {/* Mobile Navigation Links */}
            <nav className="mt-4 flex flex-col space-y-4">
              <Link
                href="/Auth"
                className="flex items-center space-x-2 text-sm"
              >
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Link>
              <Link
                href="/wishlist"
                className="flex items-center space-x-2 text-sm"
              >
                <Heart className="h-4 w-4" />
                <span>Wishlist</span>
              </Link>
              {/* Menu Categories */}
              <div className="border-t pt-4">
                <h3 className="mb-2 text-sm font-semibold">Categories</h3>
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block py-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="mr-6 flex items-center ">
          <span className="text-base md:text-2xl font-bold text-primary">
            EventEase
          </span>
        </Link>

        {/* Location Selector - Hidden on Mobile */}
        <Button
          variant="ghost"
          className="mr-6 hidden items-center space-x-2 lg:flex"
        >
          <MapPin className="h-4 w-4" />
          <div className="flex flex-col items-start text-sm">
            <span className="font-medium">Mumbai</span>
            <span className="text-xs text-muted-foreground">Mumbai city</span>
          </div>
        </Button>

        {/* Search Bar */}
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative w-full max-w-2xl">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for 'Birthday'"
              className="w-full bg-muted pl-8 md:w-2/3 lg:w-full"
            />
          </div>
        </div>

        {/* Navigation Icons */}
        <div className="ml-auto gap-2 flex items-center ">
          <Button
            onClick={() => {
              router.push("/Auth");
            }}
            variant="ghost"
            size="icon"
            className="flex gap-2 w-full px-2"
          >
            <User className="" />
            <p className="md:flex hidden">Profile</p>
          </Button>
          <Button variant="ghost" size="icon" className="flex gap-2 w-full px-2">
            <Heart className="" />
            <p className="md:flex hidden">Wishlist</p>
          </Button>
        </div>
      </div>
    </header>
  );
}
