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
Object.defineProperty(exports, "__esModule", { value: true });
exports.hello = exports.getUsers = void 0;
const db_1 = require("../models/db");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = db_1.database.collection("user");
    console.log("HITTT");
    const users = user.find();
    const result = yield users.toArray();
    res.status(200).send(result);
});
exports.getUsers = getUsers;
const hello = (req, res) => {
    res.status(200).send("Hello World");
};
exports.hello = hello;
