
const { AllUsers } = require("@/config/appwriteServer");
const { NextResponse } = require("next/server");

export const POST = async (req) => {
  try {
    const { userID, Role } = await req.json();
    const getUser = await AllUsers.get(userID);

    if (!getUser) {
      return NextResponse.json({ error: "User not found" });
    }

    const updatedLabels = [...(getUser.labels || []), Role];

    await AllUsers.updateLabels(userID, updatedLabels);
    
    return NextResponse.json({ User: userID, Roles: updatedLabels });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
};
