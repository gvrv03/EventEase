import React, { useState, useEffect } from "react";
import { useAuth } from "@/Context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const MainDetails = ({ userID }) => {
  const { user, EMVDetails } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState({
    Name: EMVDetails?.Name || "",
    AboutUs: EMVDetails?.AboutUs || "",
    Address: EMVDetails?.Address || "",
  });

  // Update editedDetails when EMVDetails changes
  useEffect(() => {
    setEditedDetails({
      Name: EMVDetails?.Name || "",
      AboutUs: EMVDetails?.AboutUs || "",
      Address: EMVDetails?.Address || "",
    });
  }, [EMVDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to original data on cancel
    setEditedDetails({
      Name: EMVDetails?.Name || "",
      AboutUs: EMVDetails?.AboutUs || "",
      Address: EMVDetails?.Address || "",
    });
    setIsEditing(false);
  };

  if (!EMVDetails) {
    return <MainDetailsSkeleton />;
  }

  return (
    <div className="bg-white md:p-5 border border-gray-100 p-2 md:rounded-md">
      <img
        src="https://marketplace.canva.com/EAE7AbabFNY/1/0/1600w/canva-blue-gold-elegant-minimalist-digital-marketer-linkedin-banner-yFznKtTfH0U.jpg"
        className="w-full rounded-md"
        alt="Banner"
      />
      <div className="-mt-14 md:-mt-32 flex-col flex gap-2 md:gap-5">
        <div className="relative">
          <img
            src="https://plus.unsplash.com/premium_photo-1682144187125-b55e638cf286?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXQlMjBtYW58ZW58MHx8MHx8fDA%3D"
            className="w-20 h-20 md:w-40 ml-5 md:ml-10 md:h-40 rounded-full border-4 border-gray-400"
            alt="Profile"
          />
          {!isEditing && userID === user?.userData?.$id && (
            <Button
              onClick={() => setIsEditing(true)}
              className="absolute right-0 top-0 bg-blue-500 text-white font-semibold px-5 p-1 rounded-md"
            >
              Edit Profile
            </Button>
          )}
        </div>

        <div className="flex-col flex gap-2">
          <div className="flex justify-between items-center">
            {isEditing ? (
              <Input
                name="Name"
                value={editedDetails.Name}
                onChange={handleInputChange}
                className="text-2xl md:text-3xl font-semibold bg-transparent"
                style={{ fontSize: "inherit", fontWeight: "inherit" }}
              />
            ) : (
              <h3 className="text-2xl md:text-3xl font-semibold">
                {EMVDetails?.Name}
              </h3>
            )}
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button
                    onClick={handleSave}
                    className="bg-blue-400 text-white font-semibold px-5 p-1 rounded-md"
                  >
                    Save
                  </Button>
                  <Button
                    onClick={handleCancel}
                    className="bg-gray-400 text-white font-semibold px-5 p-1 rounded-md"
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button className="bg-blue-400 text-white font-semibold px-5 p-1 rounded-md">
                  Share
                </Button>
              )}
            </div>
          </div>

          {isEditing ? (
            <Textarea
              name="AboutUs"
              value={editedDetails.AboutUs}
              onChange={handleInputChange}
              className="text-gray-600 bg-transparent resize-none"
              style={{ minHeight: "auto", height: "auto" }}
            />
          ) : (
            <p className="text-gray-600">{EMVDetails?.AboutUs}</p>
          )}

          {isEditing ? (
            <Input
              name="Address"
              value={editedDetails.Address}
              onChange={handleInputChange}
              className="text-gray-400 md:text-lg bg-transparent"
              style={{ fontSize: "inherit" }}
            />
          ) : (
            <p className="text-gray-400 md:text-lg">{EMVDetails?.Address}</p>
          )}
        </div>

        <div className="flex gap-2">
          {EMVDetails?.data?.labels?.map((item, index) => (
            <p className="p-2 bg-blue-100 rounded-md text-sm px-5" key={index} >{item}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainDetails;

const MainDetailsSkeleton = () => {
  return (
    <div className="bg-white md:p-5 border border-gray-100 p-2 md:rounded-md">
      <div className="w-full h-48 bg-gray-200 animate-pulse rounded-md"></div>
      <div className="-mt-14 md:-mt-32 flex-col flex gap-2 md:gap-5">
        <div className="relative">
          <div className="w-20 h-20 md:w-40 ml-5 md:ml-10 md:h-40 rounded-full bg-gray-300 animate-pulse"></div>
        </div>
        
        <div className="flex-col flex gap-4">
          <div className="flex justify-between items-center">
            <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
          </div>
          <div className="h-20 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-2/3 animate-pulse"></div>
          <div className="flex gap-2">
            {[1, 2].map((i) => (
              <div key={i} className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
