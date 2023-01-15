import { Server, Socket } from "socket.io";
import handler from "./handler";

const io = new Server(4040, {
  cors: {
    origin: "*",
  },
});

const onConnection = (socket: Socket) => {
  handler(io, socket);
};

io.on("connection", onConnection);
