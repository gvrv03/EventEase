"use client";

import React, { useEffect, useState } from "react";
import { useEvents } from "@/Context/EventContext";
import { ListCollectionData } from "@/Services/Appwrite";
import { TransactionCollection } from "@/config/appwrite";
import { Query } from "appwrite";
import { useAuth } from "@/Context/AuthContext";
import moment from "moment";

const TransactionRecords = () => {
  const { eventSingle } = useEvents();
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
console.log(eventSingle);

  useEffect(() => {
    if (!user?.userData?.$id || !eventSingle?.$id) return;

    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await ListCollectionData(TransactionCollection, [
          Query.equal("usersDetails", eventSingle?.userDetails?.$id),
          Query.equal("eventCreation", eventSingle?.$id),
          Query.orderDesc("$createdAt"),
        ]);

        setTransactions(response?.documents || []);
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError("Failed to load transactions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [eventSingle]);

  return (
    <div className="bg-white p-6 w-full rounded-md shadow-md mx-auto">
      <h1 className="text-xl font-semibold mb-4 text-gray-800">Transaction Records</h1>

      {loading && <div className="text-center py-4">Loading transactions...</div>}
      {error && <div className="text-center text-red-500 py-4">{error}</div>}
      {!loading && !error && transactions.length === 0 && (
        <div className="text-center text-gray-500 py-4">No transactions found.</div>
      )}

      {!loading && !error && transactions.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 rounded-md">
            <thead>
              <tr className="bg-purple-500 text-white text-left">
                <th className="p-3">User Name</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction?.$id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="p-3">{transaction?.usersDetails?.Name || "N/A"}</td>
                  <td className="p-3">{transaction?.Amount || "-"}</td>
                  <td className="p-3">
                    {moment(transaction?.$createdAt).format("DD-MM-YYYY")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionRecords;
