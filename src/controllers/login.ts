import { Response, Request } from "express";
import bcrypt from "bcrypt";
import { database } from "../models/db";
import "dotenv/config";
import jwt from "jsonwebtoken";

const user = database.collection("user");
export const login = async (req: Request, res: Response) => {
	const { username, password, socketId } = req.body;
	const isExist = await user.findOne({ username });
	console.log(isExist);
	if (isExist === null) {
		res.status(400).send("Username not found");
	} else {
		const decPassword = await bcrypt.compare(password, isExist.encryptPassword);
		console.log(isExist);
		console.log(decPassword);
		if (decPassword) {
			// user.updateOne({ username: username }, { $push: { socketId: socketId } });
			console.log(isExist);
			const SECRET_KEY = process.env.SECRET_KEY || "";
			console.log(username);
			console.log(password);
			const token = jwt.sign({ username }, SECRET_KEY, {
				expiresIn: "1h",
			});
			console.log("TOKEN", token);
			res.cookie("username", username).send("Login Sucessfull");
		} else {
			res.status(200).send("Password is wrong");
		}
	}
};

export const logout = async (req: Request, res: Response) => {
	const { token } = req.body;
	// const SECRET_KEY = process.env.SECRET_KEY || "";
	const { username } = jwt.decode(token);
	res.cookie("token", "").send("Logout sucessfull");
};
