import { Server, Socket } from "socket.io";

export default (io: Server, socket: Socket) => {
  const createdMessage = (msg: any) => {
    socket.broadcast.emit("newIncomingMessage", msg);
  };

  socket.on("createdMessage", createdMessage);
};
