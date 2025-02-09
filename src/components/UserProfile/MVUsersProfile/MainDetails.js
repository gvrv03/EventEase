import React from "react";

const MainDetails = () => {
  return (
    <div className=" bg-white md:p-5 border border-gray-100 p-2 md:rounded-md">
      <img
        src="https://marketplace.canva.com/EAE7AbabFNY/1/0/1600w/canva-blue-gold-elegant-minimalist-digital-marketer-linkedin-banner-yFznKtTfH0U.jpg"
        className="w-full rounded-md "
      />

      <div className="-mt-14 md:-mt-32 flex-col flex gap-2 md:gap-5">
        <img
          src="https://plus.unsplash.com/premium_photo-1682144187125-b55e638cf286?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXQlMjBtYW58ZW58MHx8MHx8fDA%3D"
          className=" w-20 h-20 md:w-40 ml-5 md:ml-10  md:h-40 rounded-full border-4 border-gray-400"
        />
        <div className="flex-col flex gap-2">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl md:text-3xl font-semibold">
              Khomendra Dahake
            </h3>
            <button className="bg-blue-400 text-white font-semibold px-5 p-1 rounded-md ">
              Share
            </button>
          </div>
          <p className="text-gray-600">
            I build Scalable Software Solutions for your Fast Growing Business |
            Building PurpleByteLabs | Software Developer | 150K+ IG Community |{" "}
          </p>
          <p className="text-gray-400 md:text-lg">
            At, Yavatmal, Maharashtra{" "}
            <span className="text-blue-500 font-semibold text-sm">
              Contact Info
            </span>{" "}
          </p>
        </div>

        <div className="flex gap-2">
          <p className="p-2 bg-blue-100 rounded-md text-sm  px-5">
            Event Manager
          </p>
          <p className="p-2 bg-blue-100 rounded-md text-sm  px-5">Vendor</p>
        </div>
        <button className="bg-blue-500 p-3 text-white font-semibold rounded-md" >Chat With Us</button>
      </div>
    </div>
  );
};

export default MainDetails;
