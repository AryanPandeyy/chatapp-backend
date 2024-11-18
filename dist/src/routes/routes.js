"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const signup_1 = require("../controllers/signup");
const login_1 = require("../controllers/login");
const user_1 = require("../controllers/user");
const routes = () => {
    const router = (0, express_1.Router)();
    router.post("/signup", signup_1.signup);
    router.post("/login", login_1.login);
    router.get("/getUsers", user_1.getUsers);
    router.get("/", user_1.hello);
    return router;
};
exports.routes = routes;
