"use client";
import MainDetails from "@/components/UserProfile/MVUsersProfile/MainDetails";
import MVPastEvents from "@/components/UserProfile/MVUsersProfile/MVPastEvents";
import MVServices from "@/components/UserProfile/MVUsersProfile/MVServices";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/Context/AuthContext";
import { GetSingleDocument } from "@/Services/Appwrite";
import { UsersCollection } from "@/config/appwrite";

const MangersVendorsProfiles = ({ params }) => {
  const userID = params.UID;
  const { setEMVDetails } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserDetails = async () => {
    try {
      setIsLoading(true);
      const userDetails = await GetSingleDocument(userID, UsersCollection);
      const response = await fetch("/api/GetSingleEMV", {
        method: "POST",
        body: JSON.stringify({ userID }),
      });
      const data = await response.json();
      setEMVDetails({ ...userDetails, data });
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="flex-col flex gap-2 md:gap-5">
      <MainDetails userID={userID} fetchUserDetails={fetchUserDetails} />
      <MVPastEvents />
      <MVServices />
    </div>
  );
};

export default MangersVendorsProfiles;

const ProfileSkeleton = () => {
  return (
    <div className="flex-col flex gap-2 md:gap-5 animate-pulse">
      {/* Main Details Skeleton */}
      <div className="bg-white md:p-5 border border-gray-100 p-2 md:rounded-md">
        {/* Banner Skeleton */}
        <div className="w-full h-48 bg-gray-200 rounded-md"></div>
        
        <div className="-mt-14 md:-mt-32 flex-col flex gap-2 md:gap-5">
          {/* Profile Picture Skeleton */}
          <div className="relative">
            <div className="w-20 h-20 md:w-40 ml-5 md:ml-10 md:h-40 rounded-full bg-gray-300"></div>
          </div>

          {/* Content Skeleton */}
          <div className="flex-col flex gap-4">
            <div className="flex justify-between items-center">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="h-8 bg-gray-200 rounded w-24"></div>
            </div>
            <div className="h-20 bg-gray-200 rounded w-full"></div>
            <div className="h-6 bg-gray-200 rounded w-2/3"></div>
            <div className="flex gap-2">
              <div className="h-8 bg-gray-200 rounded w-24"></div>
              <div className="h-8 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Past Events Skeleton */}
      <div className="bg-white p-4 rounded-md">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-gray-200 rounded-md"></div>
          ))}
        </div>
      </div>

      {/* Services Skeleton */}
      <div className="bg-white p-4 rounded-md">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-md"></div>
          ))}
        </div>
      </div>
    </div>
  );
};
