import express, { Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from "./types/socket";
import mongoose from 'mongoose';

const app = express();
app.use(cors({origin: true}));
const httpServer = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(httpServer, {cors: {
    origin: "http://localhost:5173"
}});
const connectionString = process.env.URI || "";

app.get("/", (res: Response) => {
    res.send("hi");
});

io.on("connection", (socket) => {
    console.log(socket.id);
    socket.on("message", (m: string) => {
        console.log(m);
    });
});

mongoose.connect(connectionString).then(result => {
httpServer.listen(3000);
}).catch(err => console.log("ERROR: ", err));
