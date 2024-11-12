import { Response, Request } from 'express';
import { createHash } from 'node:crypto';
import { database } from '../models/db';
import 'dotenv/config';
import jwt from 'jsonwebtoken';

const user = database.collection("user");
export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const hash = createHash('sha256');
    const isExist = await user.findOne({username});
    if (!isExist) {
        res.status(400).send("Username or password is wrong");
    }
    console.log(isExist);
    const SECRET_KEY = process.env.SECRET_KEY || "";
    const token = jwt.sign({username, password}, SECRET_KEY, {expiresIn: "1h"});
    res.cookie("token", token);
    res.status(200).send("Login Successfull");
}
