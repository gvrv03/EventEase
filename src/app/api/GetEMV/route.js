import { AllUsers } from "@/config/appwriteServer";
import { NextResponse } from "next/server";
import { Query } from "node-appwrite";

export const POST = async (req) => {
  try {
    const { providerType } = await req.json();

    // Validate input
    if (!providerType) {
      return NextResponse.json(
        { error: "Provider type is required" },
        { status: 400 }
      );
    }
    // Query users where labels array contains the providerType
    const users = await AllUsers.list([
        Query.contains("labels", providerType)
    ]);

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
};
