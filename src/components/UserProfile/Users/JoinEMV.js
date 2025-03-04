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
    <>
      <div className="p-2 bg-white border border-blue-200 rounded-md flex-col items-center justify-center flex">
        <div className="text-center py-2">
          Join as{" "}
          <span className="text-blue-500 font-semibold">
            Event Manager / Vendors
          </span>
        </div>

        <button
          onClick={() => setShowBusinessForm(!showBusinessForm)}
          className="font-semibold text-sm border px-5 py-2 rounded-md text-blue-500 text-center"
        >
          Join Now
        </button>
      </div>

      {showBusinessForm && <SubmitBusinessProof />}
    </>
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
      await getBusinessDetails()
      toast.success("Request Submitted");
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
    <div className="mt-2 p-2 border rounded-md bg-gray-50">
      <h4 className="text-lg font-semibold">Submit Business Details</h4>
      <form className="space-y-2 mt-2" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium">Select Role</label>
          <Select
            name="Role"
            onValueChange={(value) => setFormData({ ...formData, Role: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="EventManager">Event Manager</SelectItem>
              <SelectItem value="Vendor">Vendor</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium">Business Name</label>
          <Input
            type="text"
            name="BName"
            value={formData.BName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Describe Your Business
          </label>
          <Textarea
            name="Description"
            value={formData.Description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">GSTIN</label>
          <Input
            type="text"
            name="GSTIN"
            value={formData.GSTIN}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Upload Business Proof
          </label>
          <Input type="file" name="BProof" onChange={handleChange} />
        </div>

        <Button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white mt-2"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};
