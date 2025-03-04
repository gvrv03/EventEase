"use client";
import { createContext, useState, useEffect, useContext } from "react";
import {
  AppwriteDatabase,
  GDGCDatabase,
  ID,
  UserAccount,
  UsersCollection,
} from "@/config/appwrite";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AddDataToCollection, GetSingleDocument } from "@/Services/Appwrite";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  // Modal State
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    isLogin: false,
    userData: {},
    isEventManager: false,
    isVendor: false,
    isAdmin: false,
  });

  const [userLoading, setuserLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    try {
      setuserLoading(true);
      const accountDetails = await UserAccount.get();

      if (accountDetails) {
        return setUser({
          isLogin: true,
          userData: accountDetails,
          isEventManager: accountDetails?.labels?.includes("EventManager"),
          isVendor: accountDetails?.labels?.includes("Vendor"),
          isAdmin: accountDetails?.labels?.includes("admin"),
        });
      } else {
        return setUser({
          isLogin: false,
          userData: null,
          isEventManager: false,
          isVendor: false,
          isAdmin: false,
        });
      }
    } catch (error) {
      console.log(error);
      return setUser({
        isLogin: false,
        userData: null,
        isEventManager: false,
        isVendor: false,
        isAdmin: false,
      });
    } finally {
      setLoading(false);
      setuserLoading(false);
    }
  };

  const logoutUser = async () => {
    try {
      await UserAccount.deleteSession("current");
      toast.success("Logged out successfully");
      checkUserStatus();
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  const [EMVDetails, setEMVDetails] = useState({});

  const contextData = {
    logoutUser,
    user,
    checkUserStatus,
    EMVDetails,
    setEMVDetails
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
