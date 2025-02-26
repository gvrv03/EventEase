"use client";
import React, { useState } from "react";
import PhoneAuth from "@/components/Authentication/PhoneAuth";

const Authentication = () => {
  return (
    <div className="my-2 rounded-xl m-auto bg-white p-2  md:max-w-[400px] flex flex-col  shadow-lg">
      <PhoneAuth />
    </div>
  );
};

export default Authentication;
