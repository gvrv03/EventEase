import { useEvents } from "@/Context/EventContext";
import React, { useState } from "react";

const EventServices = () => {
  const [services, setServices] = useState([]);
  const [arrAmount, setArrAmount] = useState([]);
  const { eventSingle } = useEvents();

  const [serviceName, setServiceName] = useState("");
  const [amount, setAmount] = useState("");
  const addService = () => {
    if (serviceName && amount) {
      setServices((prev) => [...prev, serviceName]);
      setArrAmount((prev) => [...prev, amount]);
      setServiceName("");
      setAmount("");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full">
      <h2 className="text-lg font-bold mb-4">Services Offered</h2>
      <div className="hidden">
        <div className="flex gap-2 ">
          <input
            type="text"
            placeholder="Service Name"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            className="flex-1 p-2 border rounded-lg text-lg "
          />
          <input
            type="text"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-24 p-2 border rounded-lg text-lg "
          />
        </div>
        <button
          onClick={addService}
          className="w-full bg-blue-600 mt-2 text-white font-bold py-2 rounded-lg"
        >
          Add Service
        </button>
      </div>
      <div className="mt-4">
        {eventSingle?.Services?.map((service, index) => (
          <div
            key={index}
            className="flex justify-between items-center  p-3 rounded-md border border-gray-200 mb-2"
          >
            <span className="text-gray-700 font-medium">{service}</span>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventServices;
