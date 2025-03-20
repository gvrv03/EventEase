"use client";

import { useState, useRef, useEffect } from "react";
import {
  Heart,
  MapPin,
  Menu,
  Search,
  User,
  LogOut,
  Settings,
  Package,
  User2,
  Calendar1,
  Users2,
  BadgeCheck,
  Badge,
  LayoutDashboard,
} from "lucide-react";
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
import { useAuth } from "@/Context/AuthContext";

export default function Navbar() {
  const router = useRouter();
  const { user, logoutUser } = useAuth();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isEMVDashboardOpen, setIsEMVDashboardOpen] = useState(false);
  const userDropdownRef = useRef(null);
  const emvDashboardRef = useRef(null);

  const menuItems = [
    { title: "Profile", href: "/UserProfiles" },
    { title: "My Events", href: "/Event/MyEvents" },
    { title: "All Event Managers/Vendors", href: "/UserProfiles/EMV" },
    // (user?.isEventManager || user?.isVendor) && {
    //   title: "Dashboard",
    //   href: "/dashboard",
    //   subMenu: [
    //     { title: "Home", href: "/dashboard" },
    //     { title: "Enquiry", href: "/dashboard/EventEnquiry" },
    //   ],
    // },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setIsUserDropdownOpen(false);
      }
      if (
        emvDashboardRef.current &&
        !emvDashboardRef.current.contains(event.target)
      ) {
        setIsEMVDashboardOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky bg-white top-0 z-50 w-full border-b bg-background">
      <div className="flex gap-2 m-auto items-center p-2">
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
            <div className="flex items-center space-x-2 border-b py-4">
              <MapPin className="h-4 w-4" />
              <div className="flex flex-col">
                <span className="text-sm font-medium">Nagpur</span>
                <span className="text-xs text-muted-foreground">
                  Nagpur city
                </span>
              </div>
            </div>
            <nav className="mt-4 flex flex-col space-y-2">
              {menuItems.map((item, index) => (
                <div key={index} className="relative">
                  <Link
                    href={item.href}
                    className="block text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.title}
                  </Link>
                </div>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/" className="mr-6 flex items-center ">
          <span className="text-base md:text-2xl font-bold text-primary">
            EventEase
          </span>
        </Link>

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

        <div className="ml-auto relative gap-2 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex gap-2 w-full px-2"
            onClick={() => router.push("/UserProfiles/EMV")}
          >
            <Users2 />
            <p className="md:flex hidden">All Event Managers/Vendors</p>
          </Button>

          {(user.isAdmin || user.isEventManager || user?.isVendor) && (
            <div className="hidden md:block relative" ref={emvDashboardRef}>
              <Button
                onClick={() => setIsEMVDashboardOpen(!isEMVDashboardOpen)}
                variant="ghost"
                size="icon"
                className="flex gap-2 w-full px-2"
              >
                <Badge />
                <p className="md:flex hidden">Dashboard</p>
              </Button>
              {isEMVDashboardOpen && <EMVDashboard />}
            </div>
          )}

          <div className="relative" ref={userDropdownRef}>
            <Button
              onClick={() =>
                user?.isLogin
                  ? setIsUserDropdownOpen(!isUserDropdownOpen)
                  : router.push("/Auth")
              }
              variant="ghost"
              size="icon"
              className="flex gap-2 w-full px-2"
            >
              <User />
              <p className="md:flex hidden">Profile</p>
            </Button>
            {isUserDropdownOpen && (
              <UserDropdown setIsDropdownOpen={setIsUserDropdownOpen} />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

const EMVDashboard = () => {
  return (
    <div className="absolute right-0 mt-3 min-w-52 bg-white border border-gray-200 shadow-md rounded-md p-2 z-50">
      <Link
        href="/dashboard"
        className="block p-2 text-sm hover:bg-gray-100 rounded-md"
      >
        Home
      </Link>
      <Link
        href="/dashboard/EventEnquiry"
        className="block p-2 text-sm hover:bg-gray-100 rounded-md"
      >
        Enquiry
      </Link>
    </div>
  );
};

const UserDropdown = ({ setIsDropdownOpen }) => {
  const { logoutUser, user } = useAuth();
  const router = useRouter();
  const [isDropDownOpen, setisDropDownOpen] = useState();
  return (
    <div className="absolute right-0 mt-3 min-w-52 bg-white border border-gray-200 shadow-md rounded-md p-2 z-50">
      <div className=" pb-3 border-b">
        <div>
          Hello{" "}
          <span className="text-blue-500 font-semibold">
            {user?.userData?.name ? user?.userData?.name : "User"}
          </span>
        </div>
        <div className="flex gap-2 py-2">
          {user?.userData?.labels?.map((label, index) => (
            <span
              key={index}
              className="text-[10px] bg-blue-100 p-1 rounded-full px-5"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
      <div onClick={()=>{
        setisDropDownOpen(!isDropDownOpen)
      }} className="cursor-pointer flex items-center space-x-2 p-2 text-sm hover:bg-gray-100 rounded-md">
        <LayoutDashboard className="h-4 w-4" />
        <p>Dashboard</p>
      </div>
      {isDropDownOpen && (
        <div className="flex mt-2 border   p-2 text-[11px]  flex-col rounded-md">
          <Link href="/dashboard" className="hover:bg-gray-100 rounded-md px-2 p-1">
            Home
          </Link>
          <Link href="/dashboard/EventEnquiry" className="hover:bg-gray-100 rounded-md px-2 p-1">
            Enquiry
          </Link>
        </div>
      )}
      <Link
        href="/UserProfiles"
        className="flex items-center space-x-2 p-2 text-sm hover:bg-gray-100 rounded-md"
      >
        <User2 className="h-4 w-4" />
        <span>Profile</span>
      </Link>
      {user?.userData?.labels?.includes("admin") && (
        <Link
          href="/Admin"
          className="flex items-center space-x-2 p-2 text-sm hover:bg-gray-100 rounded-md"
        >
          <BadgeCheck className="h-4 w-4" />
          <span>Admin Dashboard</span>
        </Link>
      )}

      <Link
        href="/Event/MyEvents"
        className="flex items-center space-x-2 p-2 text-sm hover:bg-gray-100 rounded-md"
      >
        <Calendar1 className="h-4 w-4" />
        <span>My Events</span>
      </Link>
      <button
        onClick={() => {
          logoutUser();
          setIsDropdownOpen(false);
        }}
        className="flex w-full items-center space-x-2 p-2 text-sm text-red-500 hover:bg-gray-100 rounded-md"
      >
        <LogOut className="h-4 w-4" />
        <span>Logout</span>
      </button>
    </div>
  );
};
