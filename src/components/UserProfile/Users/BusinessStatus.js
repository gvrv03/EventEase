"use client";
import { BusinessDetailCollection } from "@/config/appwrite";
import { getBusinessDetails } from "@/Services/Appwrite";
import { useEffect, useState } from "react";
import { Loader2, CheckCircle, Clock, RefreshCcw } from "lucide-react";
import moment from "moment/moment";

const BusinessStatus = () => {
  const [businessData, setBusinessData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await getBusinessDetails();
      setBusinessData(res);
    } catch (error) {
      console.error("Error fetching business data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="p-4  bg-white rounded-md shadow-md">
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
        {businessData.map((business) => (
          <div
            key={business.$id}
            className="border p-3  rounded-md shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-sm font-semibold text-gray-800">
              {business.BName}
            </h2>
            <h2 className="text-sm font-semibold text-gray-600">
              {business.Role}
            </h2>
            <p className="text-xs text-gray-600">{business.Description}</p>
            <p className="text-xs font-mono text-gray-500 mt-1">
              GSTIN: {business.GSTIN || "N/A"}
            </p>
            <div className="flex justify-between flex-row-reverse items-center" >
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessStatus;
