import { Client, Account, Databases, Storage } from "appwrite";
export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_PROJECTID);

export const GDGCDatabase = process.env.NEXT_PUBLIC_DATABASEID;
export const UsersCollection = process.env.NEXT_PUBLIC_USERS_ID;

export const BusinessDetailCollection = process.env.NEXT_PUBLIC_BUSINESS_ID;
export const EventCreationCollection =
  process.env.NEXT_PUBLIC_EVENT_CREATION_ID;
export const TransactionCollection = process.env.NEXT_PUBLIC_TRANSACTION_ID;
export const EventCommunicationCollection =
  process.env.NEXT_PUBLIC_EVENT_COMMUNICATION;

export const EventNotificationCollection =
  process.env.NEXT_PUBLIC_EVENT_NOTIFICATION;

export const UserAccount = new Account(client);

export const AppwriteDatabase = new Databases(client);
export const StorageBucket = new Storage(client);
export { ID } from "appwrite";
