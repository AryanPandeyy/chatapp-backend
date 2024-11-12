import { Response, Request } from 'express';
import { createHash } from 'node:crypto';
import { database } from '../models/db';
const user = database.collection("user");
export const signup = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const hash = createHash('sha256');
    const isExist = await user.findOne({username});
    if (isExist) {
        res.status(400).send("Username already exist");
    }
    await user.insertOne({username, password});
    res.status(200).send("Registered Successfully");
}
