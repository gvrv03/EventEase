

import { Client, Account, Databases, Storage } from "appwrite";
export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_PROJECTID);

export const GDGCDatabase = process.env.NEXT_PUBLIC_DATABASEID;
export const UsersCollection = process.env.NEXT_PUBLIC_USERS_ID;
export const BusinessDetailCollection = process.env.NEXT_PUBLIC_BUSINESS_ID;

export const UserAccount = new Account(client);

export const AppwriteDatabase = new Databases(client);
export const StorageBucket = new Storage(client);
export { ID } from "appwrite";


