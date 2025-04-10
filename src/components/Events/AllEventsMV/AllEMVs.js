import { AllUsers } from "@/config/appwriteServer";
import React from "react";
import { Phone, CheckCircle, XCircle, User } from "lucide-react";
import { Query } from "node-appwrite";
import Link from "next/link";

const AllEMV = async () => {
  const response = await AllUsers.list([
    Query.contains("labels", ["Vendor", "EventManager"]),
    Query.orderDesc()
  ]);

  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
      {response?.users.map((user) => (
        <div key={user.$id} className="p-2 border rounded-md bg-white">
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between">
              <div className="flex items-center space-x-3">
                <User className="w-6 h-6 text-blue-500" />
                <h3 className="text-lg font-semibold">
                  {user.name || "Anonymous"}
                </h3>
              </div>
              {/* <div className="flex items-center space-x-2">
                {user.phoneVerification ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500" />
                )}
                <span className="text-gray-700 text-sm">
                  {user.phoneVerification ? "Verified" : "Not Verified"}
                </span>
              </div> */}
            </div>
            {/* <p className="text-sm text-gray-600">{user.AboutUs}</p> */}
            <div className="flex gap-2">
              {user?.labels?.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-100 rounded-md px-3 py-1 w-fit  text-xs text-black"
                >
                  {item}
                </div>
              ))}{" "}
            </div>
            <div className="flex items-center w-full">
              <Link
                href={`/UserProfiles/${user.$id}`}
                className="rounded-sm text-white text-xs w-full text-center px-5 py-2 bg-blue-500 font-semibold"
              >
                View Profile
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllEMV;
