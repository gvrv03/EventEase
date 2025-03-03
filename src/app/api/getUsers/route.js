const { AllUsers } = require("@/config/appwriteServer");
const { NextResponse } = require("next/server");

export const POST = async () => {
  try {
    const getUsers = await AllUsers.list();
    return NextResponse.json({ message: getUsers });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
};
