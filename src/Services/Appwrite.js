import { AllUsers } from "@/config/appwriteServer";
import { ID, Permission, Query, Role } from "appwrite";

const {
  AppwriteDatabase,
  client,
  UserAccount,
  UsersCollection,
  BusinessDetailCollection,
  EventCreationCollection,
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

export const SignInUser = async (email, password) => {
  await UserAccount.createEmailPasswordSession(email, password);
  const accountDetails = await UserAccount.get();
  const checkUser = await ListCollectionData(UsersCollection, [
    Query.equal("$id", accountDetails.$id),
  ]);

  if (!checkUser?.documents?.length > 0) {
    await AppwriteDatabase.createDocument(
      process.env.NEXT_PUBLIC_DATABASEID,
      UsersCollection,
      accountDetails.$id,
      { Name: accountDetails?.name ? accountDetails?.name : "User" },
      [
        Permission.update(Role.user(accountDetails.$id)),
        Permission.delete(Role.user(accountDetails.$id)),
        Permission.read(Role.user(accountDetails.$id)),
      ]
    );
  } else {
    await UpdateCollectionData(UsersCollection, accountDetails.$id, {
      Name: accountDetails?.name ? accountDetails?.name : "User",
    });
  }
};

export const SignUpUser = async (email, password, name) => {
  await UserAccount.create(ID.unique(), email, password, name);
  await SignInUser(email, password);
};

export const updateUser = async (userName, userEmail, phone, password) => {
  await UserAccount.updateName(userName);
  userEmail && (await UserAccount.updateEmail(userEmail, password));
  phone && (await UserAccount.updatePhone("+91" + phone, password));
  const accountDetails = await UserAccount.get();
  if (accountDetails?.$id) {
    await UpdateCollectionData(UsersCollection, accountDetails.$id, {
      Name: accountDetails.name || "User",
    });
  }
};

export const getBusinessDetails = async () => {
  const accountDetails = await UserAccount.get();
  const res = await ListCollectionData(BusinessDetailCollection, [
    Query.equal("usersDetails", accountDetails.$id),
    Query.orderDesc("$createdAt"),
  ]);
  return res?.documents;
};

export const getUsersEvents = async () => {
  const accountDetails = await UserAccount.get();
  const res = await ListCollectionData(EventCreationCollection, [
    Query.equal("userDetails", accountDetails.$id),
    Query.orderDesc("$createdAt"),
  ]);
  return res?.documents;
};

export const getEMVEvents = async () => {
  const accountDetails = await UserAccount.get();
  const res = await ListCollectionData(EventCreationCollection, [
    Query.equal("EMVDetails", accountDetails.$id),
    Query.orderDesc("$createdAt"),
  ]);
  return res?.documents;
};
