import cors from "cors";
import morgan from "morgan";
import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { log } from "node:console";

const app = express();
const server = createServer(app);

const io = new Server(server);

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Hola Mundo</h1>");
});

io.on("connection", (socket) => {
  console.log("cliente conectado conn id:", socket.id);

  socket.on("chat-message", (msg) => {
    console.log({ msg });

    io.emit("chat-message", msg);
  });

  socket.on("disconnect", () => {
    console.log("cliente desconectado ");
  });
});

server.listen(4000, () => console.log("hola desde el http://localhost:4000"));
