import { Client, Users } from "node-appwrite";

export const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_PROJECTID)
  .setKey(process.env.NEXT_PUBLIC_APPWRITE_API);

export const AllUsers = new Users(client);
