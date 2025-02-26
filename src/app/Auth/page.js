"use client";
import React, { useState } from "react";
import PhoneAuth from "@/components/Authentication/PhoneAuth";

const Authentication = () => {
  return (
    <div className="my-2 rounded-xl m-auto bg-white p-2 max-w-[600px] flex flex-col gap-4 shadow-lg">
      <img
        src="https://img.ebonow.com/Posters/Login_popup_banner.webp"
        className="rounded-lg"
        alt="Login Banner"
      />

      <PhoneAuth />
    </div>
  );
};

export default Authentication;
