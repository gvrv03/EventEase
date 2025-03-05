import React, { useState, useEffect } from "react";
import { useAuth } from "@/Context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil } from "lucide-react";
import { UpdateCollectionData } from "@/Services/Appwrite";
import { UsersCollection } from "@/config/appwrite";
import toast from "react-hot-toast";

const MainDetails = ({ userID,fetchUserDetails }) => {
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
  const [loading, setLoading] = useState(false);
  const handleSave = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      await UpdateCollectionData(UsersCollection, userID, editedDetails);
      fetchUserDetails()
      toast.success("Details updated successfully");
      setIsEditing(false);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
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
        className="w-full rounded-md h-32  md:h-48 object-cover"
        alt="Banner"
      />
      <div className="-mt-14 md:-mt-32 flex-col flex gap-2 md:gap-5">
        <div className="relative">
          <img
            src="https://plus.unsplash.com/premium_photo-1682144187125-b55e638cf286?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXQlMjBtYW58ZW58MHx8MHx8fDA%3D"
            className="w-24 h-24 md:w-40 ml-5 md:ml-10 md:h-40 rounded-full border-4 border-gray-400 object-cover shadow-lg"
            alt="Profile"
          />
          {!isEditing && userID === user?.userData?.$id && (
            <Button
              onClick={() => setIsEditing(true)}
              className="absolute -bottom-2  md:left-[7%] left-[20%] bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-md"
            >
              <Pencil className="md:w-5 w-3 h-3 md:h-5" />
            </Button>
          )}
        </div>

        <div className="flex-col flex gap-4 p-2">
          <div className="flex justify-between items-center">
            {isEditing ? (
              <Input
                name="Name"
                value={editedDetails.Name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className="text-2xl md:text-3xl font-semibold bg-transparent border-gray-300 focus:border-blue-500 transition-colors duration-200"
                style={{ fontSize: "inherit", fontWeight: "inherit" }}
              />
            ) : (
              <h3 className="text-2xl md:text-3xl font-semibold">
                {EMVDetails?.Name}
              </h3>
            )}
            
          </div>

          {isEditing ? (
            <Textarea
              name="AboutUs"
              value={editedDetails.AboutUs}
              onChange={handleInputChange}
              placeholder="Tell us about yourself or your business..."
              className="text-gray-600 bg-transparent resize-none min-h-[100px] border-gray-300 focus:border-blue-500 transition-colors duration-200"
              style={{ minHeight: "auto", height: "auto" }}
            />
          ) : (
            <p className="text-gray-600 whitespace-pre-wrap">
              {EMVDetails?.AboutUs || "No description available"}
            </p>
          )}

          {isEditing ? (
            <Input
              name="Address"
              value={editedDetails.Address}
              onChange={handleInputChange}
              placeholder="Enter your address"
              className="text-gray-400  bg-transparent border-gray-300 focus:border-blue-500 transition-colors duration-200"
              // style={{ fontSize: "inherit" }}
            />
          ) : (
            <p className="text-gray-400 textsm">
              {EMVDetails?.Address || "No address provided"}
            </p>
          )}

<div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button
                    onClick={handleSave}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-md transition-colors duration-200 flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {loading ? "Saving..." : "Save"}
                  </Button>
                  <Button
                    onClick={handleCancel}
                    className="bg-white hover:bg-gray-100 text-gray-600 font-semibold px-5 py-2 rounded-md transition-colors duration-200 flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button className="hidden bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-md transition-colors duration-200  items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                  Share
                </Button>
              )}
            </div>
        </div>

        <div className="flex gap-2 flex-wrap p-2">
          {EMVDetails?.data?.labels?.map((item, index) => (
            <span
              key={index}
              className="px-4 py-1 bg-blue-100 text-blue-800 rounded-md text-xs md:text-sm font-medium hover:bg-blue-200 transition-colors duration-200"
            >
              {item}
            </span>
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
              <div
                key={i}
                className="h-8 bg-gray-200 rounded w-24 animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
