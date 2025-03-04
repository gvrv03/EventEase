"use client";
import { BusinessDetailCollection } from "@/config/appwrite";
import { ListCollectionData, UpdateCollectionData } from "@/Services/Appwrite";
import { useEffect, useState } from "react";
import { Loader2, CheckCircle, Clock, RefreshCcw } from "lucide-react";
import moment from "moment/moment";
import { Query } from "appwrite";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useAuth } from "@/Context/AuthContext";

const BusinessVerification = () => {
  const [businessData, setBusinessData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    setLoading(true);
    try {
      const res = await ListCollectionData(BusinessDetailCollection, [
        Query.orderDesc("$createdAt"),
      ]);

      setBusinessData(res?.documents);
    } catch (error) {
      console.error("Error fetching business data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const [approvedLoadingId, setApprovedLoadingId] = useState(null);
  const ApprovedBusiness = async (userID,docID, Role) => {
    try {
      setApprovedLoadingId(docID); // Set loading state for the specific business
      await UpdateCollectionData(BusinessDetailCollection, docID, {
        Status: true,
      });
      const res = await fetch("/api/BusinessApproval", {
        method: "POST",
        body: JSON.stringify({ userID, Role: Role }),
      });

      const data = await res.json();
      if (data?.error) {
        throw new Error(data?.error);
      }
      toast.success("Business Approved Successfully");
      getData();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setApprovedLoadingId(null); // Reset loading state
    }
  };
  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-bold text-gray-700">Business Requests</h1>
        <button
          onClick={getData}
          className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition"
          disabled={loading}
        >
          <RefreshCcw size={18} className={loading ? "animate-spin" : ""} />
          <span className="text-sm">Refresh</span>
        </button>
      </div>

      {businessData.length === 0 && !loading && (
        <p className="mt-2 text-gray-500">No business requests found.</p>
      )}
      {loading && (
        <div className="text-sm text-gray-500 flex items-center">
          <Loader2 size={16} className="animate-spin mr-2" /> Fetching
          Records...
        </div>
      )}

      <div className="space-y-3">
        {businessData?.map((business) => (
          <div
            key={business.$id}
            className="border p-3 flex-col flex gap-2  rounded-md shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-sm font-semibold text-gray-800">
              {business.BName}
            </h2>
            <h2 className="text-sm font-semibold text-gray-600">
              {business.Role}
            </h2>
            <p className="text-xs text-gray-600">{business.Description}</p>
            <p className="text-xs font-mono text-gray-500 ">
              GSTIN: {business.GSTIN || "N/A"}
            </p>
            <div className="flex justify-between flex-row-reverse items-center">
              <div className="flex items-center mt-2 space-x-2">
                {business.Status ? (
                  <CheckCircle className="text-green-500" size={16} />
                ) : (
                  <Clock className="text-yellow-500" size={16} />
                )}
                <span className="text-sm font-medium text-gray-700">
                  {business.Status ? "Approved" : "Pending"}
                </span>
              </div>

              <div className="text-xs">
                {moment(business.$createdAt).format("lll")}
              </div>
            </div>

            <div className="flex gap-2 justify-between items-center ">
              <Button className="text-xs p-1 font-semibold px-5">
                View Profile
              </Button>
              <Button
                onClick={() => ApprovedBusiness(business?.usersDetails?.$id,business.$id, business.Role)}
                disabled={business.Status || approvedLoadingId === business.$id}
                className="text-xs p-1 disabled:bg-blue-300 font-semibold px-5"
              >
                {approvedLoadingId === business.$id
                  ? "Approving..."
                  : "Approve"}
              </Button>
            </div>
          </div>
        ))}
        
        
      </div>
    </div>
  );
};

export default BusinessVerification;
