import { MongoClient } from "mongodb";
import "dotenv/config";

const connectionString = process.env.ATLAS_URI || "";
console.log("HIT");
export const client = new MongoClient(connectionString);
export const database = client.db("chat-app");
