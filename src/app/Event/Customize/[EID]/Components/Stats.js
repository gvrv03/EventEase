"use client";
import React, { useState } from "react";
import {
  Wallet,
  CreditCard,
  IndianRupeeIcon,
  RefreshCcw,
  X,
} from "lucide-react";
import { useEvents } from "@/Context/EventContext";
import { EventCreationCollection } from "@/config/appwrite";
import { UpdateCollectionData } from "@/Services/Appwrite";
import toast from "react-hot-toast";
import { useAuth } from "@/Context/AuthContext";
const Stats = () => {
  const { eventSingle } = useEvents();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [loading, setLoading] = useState(false);
const {user} = useAuth()
  const totalBudget =
    eventSingle?.Budget?.reduce((acc, curr) => acc + curr, 0) || 0;
  const amountPaid = eventSingle?.AmountPaid || 0;
  const remainingAmount = totalBudget - amountPaid;

  const handlePayment = async () => {
    if (paymentAmount > 0 && paymentAmount <= remainingAmount) {
      setLoading(true);
      try {
        await UpdateCollectionData(EventCreationCollection, eventSingle?.$id, {
          AmountPaid: eventSingle?.AmountPaid + parseInt(paymentAmount),
        });
        setShowPaymentModal(false);
        setPaymentAmount("");
        toast.success(`Payment of ₹${paymentAmount} successful!`);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Invalid payment amount.");
    }
  };
  

  const isEventUser = eventSingle?.userDetails?.$id === user?.userData?.$id;

  const statsData = [
    {
      title: "Approx Budget",
      amount: `₹ ${totalBudget}`,
      icon: <Wallet className="text-gray-600 w-6 h-6" />,
    },
    {
      title: "Amount Paid",
      amount: `₹ ${amountPaid}`,
      icon: <CreditCard className="text-green-600 w-6 h-6" />,
    },
    {
      title: "Remaining Amount",
      amount: `₹ ${remainingAmount}`,
      icon: <IndianRupeeIcon className="text-red-600 w-6 h-6" />,
    },
  ];

  return (
    <div className="bg-white p-3 w-full h-fit rounded-lg shadow-md">
      <div className="flex justify-between items-center pb-4">
        <h1 className="text-2xl font-bold text-gray-800">Event Stats</h1>
        <button className="text-sm flex items-center gap-2 text-gray-600">
          <RefreshCcw size={15} />
          Refresh
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white p-4 md:p-6 rounded-lg shadow hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-2">{stat.icon}</div>
            <h2 className="text-sm font-medium text-gray-600 mt-2">
              {stat.title}
            </h2>
            <div className="text-2xl font-bold text-gray-800">
              {stat.amount}
            </div>
            {stat.title === "Remaining Amount" && remainingAmount > 0 && isEventUser && (
              <button
                className="text-sm bg-blue-500 text-white px-10 p-1 text-center rounded-md w-full mt-2"
                onClick={() => setShowPaymentModal(true)}
              >
                Pay Now
              </button>
            )}
          </div>
        ))}
      </div>

      {showPaymentModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Make a Payment</h2>
              <button onClick={() => setShowPaymentModal(false)}>
                <X size={20} />
              </button>
            </div>
            <input
              type="number"
              placeholder="Enter amount"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              className="w-full mt-4 p-2 border rounded"
            />
            <button
              className="mt-4 w-full bg-green-500 text-white p-2 rounded disabled:opacity-50"
              onClick={handlePayment}
              disabled={loading}
            >
              {loading ? "Processing..." : `Pay ₹${paymentAmount || 0}`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stats;
