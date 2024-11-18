import { Response, Request } from "express";
import bcrypt from "bcrypt";
import { database } from "../models/db";
import "dotenv/config";
import jwt from "jsonwebtoken";

const user = database.collection("user");
export const login = async (req: Request, res: Response) => {
	const { username, password } = req.body;
	const isExist = await user.findOne({ username });
	if (isExist === null) {
		res.status(404).send("Username not found");
	} else {
		const decPassword = await bcrypt.compare(password, isExist.encryptPassword);
		if (decPassword) {
			const SECRET_KEY = process.env.SECRET_KEY || "";
			const token = jwt.sign({ username }, SECRET_KEY, {
				expiresIn: "1h",
			});
      res.cookie("username", username);
			res.cookie("token", token).send("Login Successfull");
		} else {
			res.status(401).send("Password is wrong");
		}
	}
};

export const logout = async (req: Request, res: Response) => {
	const { token } = req.body;
	// const SECRET_KEY = process.env.SECRET_KEY || "";
	const { username } = jwt.decode(token);
	res.cookie("token", "").send("Logout sucessfull");
};
