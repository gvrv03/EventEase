import { AllUsers } from "@/config/appwriteServer";
import React from "react";
import { Phone, CheckCircle, XCircle, User, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

const AllUsersFetch = async () => {
  const response = await AllUsers.list();

  return (
    <div className="">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold">User List</h2>
        
      </div>
      <div className="overflow-x-auto w-full bg-white  border rounded-lg ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>User ID</TableHead>
              <TableHead>Phone</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {response?.users.map((user) => (
              <TableRow key={user.$id} className="hover:bg-gray-50">
                <TableCell className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-blue-500" />
                  <span>{user.name || "Anonymous"}</span>
                </TableCell>
                <TableCell className="text-gray-600">{user.$id}</TableCell>
                <TableCell className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-green-500" />
                  <span>{user.phone || "N/A"}</span>
                </TableCell>
                <TableCell className="flex items-center space-x-2">
                  {user.phoneVerification ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                  <span className="text-gray-700">
                    {user.phoneVerification ? "Verified" : "Not Verified"}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AllUsersFetch;
