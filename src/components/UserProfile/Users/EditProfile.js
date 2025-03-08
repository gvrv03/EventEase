"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useAuth } from "@/Context/AuthContext";
import toast from "react-hot-toast";
import { updateUser } from "@/Services/Appwrite";

const EditProfile = () => {
  const router = useRouter();
  const { user, checkUserStatus } = useAuth();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setloading] = useState(false);
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (user?.userData) {
      setName(user.userData.name);
      setPhone(user.userData.phone);
      setEmail(user.userData.email);
    }
  }, [user]);

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      await updateUser(
        name,
        user.userData.email != email ? email : "",
        user.userData?.phone != phone ? phone : "",
        password
      );
      await checkUserStatus();
      toast.success("User Updated Successfully");
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="flex items-center justify-center ">
      <Card className="p-2 rounded-md flex-col flex gap-2 w-full ">
        <h3 className="font-semibold text-lg">Edit Profile</h3>
        <CardContent className="p-0">
          <form onSubmit={updateProfile} className="space-y-2">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Phone No.(+91)
              </label>
              <Input
                className="disabled:bg-gray-200"
                value={parseInt(phone)}
                type="number"
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Enter Password
              </label>
              <Input
                className="disabled:bg-gray-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter Password to Update"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              {loading ? "Updating..." : "Update Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProfile;
