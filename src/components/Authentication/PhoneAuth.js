"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { sendOTP, verifyOTP } from "@/Services/Appwrite";
import toast from "react-hot-toast";
import { OTPInput } from "./OTPInput";

const PhoneAuth = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [curUser, setcurUser] = useState(null);
  console.log(curUser);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await sendOTP(phone);
      setOtpSent(true);
      setcurUser(res);
      toast.success("OTP Sent Successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await verifyOTP(curUser, otp);
      toast.success("OTP Verified Successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center  rounded-lg  w-full ">
      <form className="w-full">
        <div className="grid gap-4">
          {!otpSent ? (
            <>
              <Input
                type="number"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="p-3 border outline-none rounded-lg"
              />
              <Button
                onClick={handleSendOtp}
                className="w-full"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send OTP"}
              </Button>
            </>
          ) : (
            <>
              <OTPInput data={otp} setData={setOtp} />

              <Button
                onClick={handleVerifyOtp}
                className="w-full"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default PhoneAuth;
