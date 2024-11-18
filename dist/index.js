"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./src/routes/routes");
require("dotenv/config");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "https://chatapp-frontend-tau-sooty.vercel.app/", credentials: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
    },
});
app.use("/", (0, routes_1.routes)());
io.on("connection", (socket) => {
    socket.on("join_room", (room) => {
        console.log("ROOM NAME: ", room);
        socket.join(room);
    });
    socket.on("message", (content, to, from) => {
        socket.to(to).emit("smessage", {
            content,
            from,
        });
    });
});
httpServer.listen(3000);
