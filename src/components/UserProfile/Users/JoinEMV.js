"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AddDataToCollection, getBusinessDetails } from "@/Services/Appwrite";
import { BusinessDetailCollection } from "@/config/appwrite";
import { useAuth } from "@/Context/AuthContext";
import toast from "react-hot-toast";

const JoinEMV = () => {
  const [showBusinessForm, setShowBusinessForm] = useState(false);

  return (
    <div className="w-full flex-col gap-2 flex md:max-w-8xl mx-auto ">
      <div className="p-6  bg-white border border-blue-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
        <div className="text-center space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Join as{" "}
            <span className="text-blue-600 font-bold">
              Event Manager / Vendor
            </span>
          </h3>
          <p className="text-gray-600 text-sm max-w-md mx-auto">
            Start your journey with us and grow your business by reaching more customers
          </p>
          <button
            onClick={() => setShowBusinessForm(!showBusinessForm)}
            className="inline-flex items-center px-6 py-2.5 rounded-full bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            {showBusinessForm ? "Hide Form" : "Join Now"}
          </button>
        </div>
      </div>

      {showBusinessForm && <SubmitBusinessProof />}
    </div>
  );
};

export default JoinEMV;

const SubmitBusinessProof = () => {
  const [formData, setFormData] = useState({
    Role: "",
    BName: "",
    Description: "",
    GSTIN: "",
    BProof: null,
  });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "file" ? files[0] : type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await AddDataToCollection(
        BusinessDetailCollection,
        {
          ...formData,
          usersDetails: user?.userData?.$id,
        },
        user?.userData?.$id
      );
      await getBusinessDetails();
      toast.success("Request Submitted Successfully!");
      setFormData({
        Role: "",
        BName: "",
        Description: "",
        GSTIN: "",
        BProof: null,
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" p-5 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300">
      <div className=" mx-auto">
        <h4 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Business Details
        </h4>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Select Role
              </label>
              <Select
                name="Role"
                onValueChange={(value) => setFormData({ ...formData, Role: value })}
              >
                <SelectTrigger className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <SelectValue placeholder="Choose your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EventManager">Event Manager</SelectItem>
                  <SelectItem value="Vendor">Vendor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Business Name
              </label>
              <Input
                type="text"
                name="BName"
                value={formData.BName}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your business name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Describe Your Business
            </label>
            <Textarea
              name="Description"
              value={formData.Description}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px]"
              placeholder="Tell us about your business..."
            />
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                GSTIN
              </label>
              <Input
                type="text"
                name="GSTIN"
                value={formData.GSTIN}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter GSTIN number"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 text-center">
                Upload Business Proof
              </label>
              <div className="relative">
                <div className="flex flex-col items-center justify-center">
                  <div className="w-full border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:border-blue-400 transition-all duration-300 bg-blue-50/30">
                    <Input
                      type="file"
                      name="BProof"
                      onChange={handleChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                    <div className="space-y-4">
                      <div className="flex justify-center">
                        <svg 
                          className="w-12 h-12 text-blue-500" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-base font-medium text-blue-600">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Accepted formats: PDF, DOC, DOCX, JPG, JPEG, PNG
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          (Max size: 5MB)
                        </p>
                      </div>
                      <div className="bg-white px-4 py-2 rounded-lg inline-block">
                        <span className="text-sm text-blue-600 font-medium">
                          Browse Files
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <Button
              type="submit"
              className={`w-full py-4 rounded-lg text-white font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl"
              }`}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center space-x-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Submitting...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <span>Submit Application</span>
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
