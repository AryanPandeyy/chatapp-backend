import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { routes } from "./src/routes/routes";
import "dotenv/config";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.use("/", routes());

io.on("connection", (socket) => {
  socket.on("join_room", (room: string) => {
    console.log("ROOM NAME: ", room);
    socket.join(room);
  });
  socket.on("message", (content: string, username: string) => {
    console.log("username: ", username);
    console.log("content: ", content);
    socket.to(username).emit("smessage", {
      content,
    });
  });
});

httpServer.listen(3000);
