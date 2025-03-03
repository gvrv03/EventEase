import { AllUsers } from "@/config/appwriteServer";
import { ID, Permission, Query, Role } from "appwrite";

const {
  AppwriteDatabase,
  client,
  UserAccount,
  UsersCollection,
  BusinessDetailCollection,
} = require("@/config/appwrite");

export const ListCollectionData = async (collectionID, queries) => {
  try {
    const res = await AppwriteDatabase.listDocuments(
      process.env.NEXT_PUBLIC_DATABASEID,
      collectionID,
      queries // [] type
    );
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const UpdateCollectionData = async (collectionID, docID, data) => {
  try {
    const res = await AppwriteDatabase.updateDocument(
      process.env.NEXT_PUBLIC_DATABASEID,
      collectionID,
      docID,
      data
    );
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const AddDataToCollection = async (collectionID, data, userID) => {
  try {
    const SLUGID = ID.unique();
    const res = await AppwriteDatabase.createDocument(
      process.env.NEXT_PUBLIC_DATABASEID,
      collectionID,
      SLUGID,
      data,
      [
        Permission.update(Role.user(userID)),
        Permission.delete(Role.user(userID)),
        Permission.read(Role.user(userID)),
      ]
    );
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const GetSingleDocument = async (docid, collectionID, queries) => {
  try {
    const res = await AppwriteDatabase.getDocument(
      process.env.NEXT_PUBLIC_DATABASEID,
      collectionID,
      docid,
      queries
    );
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const sendOTP = async (phoneNo) => {
  const session = await UserAccount.createPhoneToken(
    ID.unique(),
    `+91${phoneNo}`
  );
  return session;
};

export const verifyOTP = async (user, otp) => {
  await UserAccount.createSession(user.userId, otp);
  const accountDetails = await UserAccount.get();

  const checkUser = await ListCollectionData(UsersCollection, [
    Query.equal("$id", user.userId),
  ]);

  if (!checkUser?.documents?.length > 0) {
    await AddDataToCollection(
      UsersCollection,
      { Name: accountDetails?.name ? accountDetails?.name : "User" },
      user.userId
    );
  } else {
    await UpdateCollectionData(UsersCollection, user.userId, {
      Name: accountDetails?.name ? accountDetails?.name : "User",
    });
  }
};

export const updateUser = async (userName) => {
  await UserAccount.updateName(userName);
  const accountDetails = await UserAccount.get();
  await UpdateCollectionData(UsersCollection, accountDetails?.$id, {
    Name: accountDetails?.name ? accountDetails?.name : "User",
  });
};

export const getBusinessDetails = async () => {
  const accountDetails = await UserAccount.get();
  const res = await ListCollectionData(BusinessDetailCollection, [
    Query.equal("usersDetails", accountDetails.$id),
    Query.orderDesc("$createdAt"),
  ]);
  return res?.documents;
};



