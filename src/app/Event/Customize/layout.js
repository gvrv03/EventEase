"use client";
import PleaseLogin from "@/components/Utility/PleaseLogin";
import { useAuth } from "@/Context/AuthContext";
import React from "react";

const AccountLayout = ({ children }) => {
  const { user } = useAuth();
  return <div>{children }</div>;
};

export default AccountLayout;
