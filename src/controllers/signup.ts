import { Response, Request } from "express";
import { database } from "../models/db";
import bcrypt from "bcrypt";

export const signup = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = database.collection("user");
  const isExist = await user.findOne({ username });
  console.log(isExist);
  if (isExist !== null) {
    res.status(409).send("Username already exist");
  } else {
	  const encryptPassword = await bcrypt.hash(password, 10);
	  console.log(password);
	  console.log(encryptPassword);
	  await user.insertOne({ username, encryptPassword });
	  res.status(200).send("Registered Successfully");
  }
};
