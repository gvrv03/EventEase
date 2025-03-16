"use client";
import PleaseLogin from "@/components/Utility/PleaseLogin";
import { useAuth } from "@/Context/AuthContext";
import React from "react";

const AccountLayout = ({ children }) => {
  const { user } = useAuth();
  return <div>{user?.isLogin ? children : <PleaseLogin/>}</div>;
};

export default AccountLayout;
