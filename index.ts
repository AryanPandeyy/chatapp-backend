import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { routes } from "./src/routes/routes";
import 'dotenv/config';

const app = express();
app.use(cors({origin: true}));
app.use(express.json());
const httpServer = createServer(app);
const io = new Server(httpServer, {cors: {
    origin: "http://localhost:5173"
}});

app.use('/', routes());

io.on("connection", (socket) => {
    console.log(socket.id);
    socket.on("message", (m: string) => {
        console.log(m);
    });
});

httpServer.listen(3000)
