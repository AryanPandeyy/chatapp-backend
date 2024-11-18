"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = exports.client = void 0;
const mongodb_1 = require("mongodb");
require("dotenv/config");
const connectionString = process.env.ATLAS_URI || "";
console.log("HIT");
exports.client = new mongodb_1.MongoClient(connectionString);
exports.database = exports.client.db("chat-app");
