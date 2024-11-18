"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../models/db");
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user = db_1.database.collection("user");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const isExist = yield user.findOne({ username });
    if (isExist === null) {
        res.status(404).send("Username not found");
    }
    else {
        const decPassword = yield bcrypt_1.default.compare(password, isExist.encryptPassword);
        if (decPassword) {
            const SECRET_KEY = process.env.SECRET_KEY || "";
            const token = jsonwebtoken_1.default.sign({ username }, SECRET_KEY, {
                expiresIn: "1h",
            });
            res.cookie("username", username);
            res.cookie("token", token).send("Login Successfull");
        }
        else {
            res.status(401).send("Password is wrong");
        }
    }
});
exports.login = login;
