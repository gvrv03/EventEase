import React from "react";

const MVPastEvents = () => {
  return (
    <div className=" flex-col flex gap-2 md:p-5 bg-white border border-gray-100 p-2 md:rounded-md">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-xl md:text-2xl">Our Past Events</h3>
        <p className="font-semibold text-blue-500">See More</p>
      </div>
      <div className="grid gap-2 grid-cols-2 md:grid-cols-6">
        <div className="border  p-3 rounded-md">
          <img
            src="https://img.ebonow.com/Products/CLA262.webp"
            alt="event"
            className="w-full rounded-md"
          />
          <div className="flex flex-col gap-1">
            <h4 className="font-semibold py-2">Birthday Party</h4>
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quos.
            </p>
          </div>
        </div>

        <div className="border  p-3 rounded-md">
          <img
            src="https://img.ebonow.com/Products/CLB223.webp"
            alt="event"
            className="w-full rounded-md"
          />
          <div className="flex flex-col gap-1">
            <h4 className="font-semibold py-2">Wedding Anniversary</h4>
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quos.
            </p>
          </div>
        </div>


      </div>
    </div>
  );
};

export default MVPastEvents;
