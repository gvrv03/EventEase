import { AllUsers } from "@/config/appwriteServer";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    const { userID } = await req.json();
    const userDetails = await AllUsers.get(userID);
    return NextResponse.json(userDetails);      
};