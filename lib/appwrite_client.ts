import * as sdk from 'node-appwrite';

const client = new sdk.Client();

client
  .setEndpoint(process.env.APPWRITE_ENDPOINT as string)
  .setProject(process.env.APPWRITE_PROJECT_ID as string)
  .setKey(process.env.APPWRITE_SECRET as string);

export default client;
