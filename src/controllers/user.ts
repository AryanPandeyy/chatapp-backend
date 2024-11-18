import { Response, Request } from "express";
import { database } from "../models/db";

export const getUsers = async (req: Request, res: Response) => {
  const user = database.collection("user");
  console.log("HITTT");
  const users = user.find();
  const result = await users.toArray();
  res.status(200).send(result);
};

export const hello = (req: Request, res: Response) => {
  res.status(200).send("Hello World");
}
