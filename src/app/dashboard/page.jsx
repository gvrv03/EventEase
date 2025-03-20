"use client";
import React, { useEffect, useState } from "react";
import { DollarSign, Users, Calendar, IndianRupee } from "lucide-react";
import { useAuth } from "@/Context/AuthContext";
import { getEMVEvents } from "@/Services/Appwrite";
import moment from "moment/moment";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalAmount, settotalAmount] = useState();

  const getEvents = async () => {
    try {
      setLoading(true);
      const response = await getEMVEvents();
      setEvents(response);
      // Calculate the total amount
      const total = response?.reduce((acc, item) => acc + item.AmountPaid, 0);
      settotalAmount(total); // Update the state with the total amount
    } catch (error) {
      setError(error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const stats = [
    {
      title: "Total Clients",
      value: events?.length,
      icon: <Users className="w-6 h-6 text-blue-500" />,
    },
    {
      title: "Total Events",
      value: 10,
      icon: <Calendar className="w-6 h-6 text-purple-500" />,
    },
    {
      title: "Total Balance",
      value: totalAmount,
      icon: <IndianRupee className="w-6 h-6 text-green-500" />,
    },

    {
      title: "Balance (5% Platform Fee) ",
      value: totalAmount - (5 / 100) * totalAmount,
      icon: <IndianRupee className="w-6 h-6 text-green-500" />,
    },
  ];

  return (
    <div className=" min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Vendor Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4"
          >
            {stat.icon}
            <div>
              <p className="text-gray-600 text-sm">{stat.title}</p>
              <h2 className="text-xl font-semibold">{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>
      <p className="text-sm py-2">
        The amount will be automatically credited to your bank account within
        5-7 working days.
      </p>

      {/* Recent Transactions */}
      <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Transactions
        </h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 text-gray-600">Client Name</th>
              <th className="text-left py-2 text-gray-600">Total Budget</th>
              <th className="text-left py-2 text-gray-600">Amount Paid</th>
              <th className="text-left py-2 text-gray-600">Date</th>
            </tr>
          </thead>
          <tbody>
            {events?.map((event, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">{event?.userDetails.Name}</td>
                <td className="py-2 text-green-600">
                  {event?.Budget?.reduce((acc, curr) => acc + curr, 0)}
                </td>
                <td className="py-2 text-green-600">{event?.AmountPaid}</td>
                <td className="py-2 text-gray-500">
                  {moment(event.eventDate).format("DD-MM-YYYY")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
