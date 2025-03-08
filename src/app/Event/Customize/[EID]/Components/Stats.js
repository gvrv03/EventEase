import React from "react";
import { Wallet, CreditCard, IndianRupeeIcon, RefreshCcw } from "lucide-react";

const statsData = [
  {
    title: "Approx Budget",
    amount: "₹ 3,000",
    icon: <Wallet className="text-gray-600 w-6 h-6" />,
  },
  {
    title: "Amount Paid",
    amount: "₹ 2,000",
    icon: <CreditCard className="text-green-600 w-6 h-6" />,
  },
  {
    title: "Remaining Amount",
    amount: "₹ 1,000",
    icon: <IndianRupeeIcon className="text-red-600 w-6 h-6" />,
  },
];

const Stats = () => {
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
              {stat.title === "Remaining Amount" && (
                <div className="text-sm bg-blue-500 text-white px-10 p-1 text-center rounded-md w-full">
                  Pay Now
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
