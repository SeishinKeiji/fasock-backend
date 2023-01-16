import "dotenv/config";
import "plugins/socket.io";
import { Socket } from "socket.io";
import fastify from "fastify";
import handler from "./handler";
import socketIO from "plugins/socket.io";
import { datasource } from "database";

const server = fastify({ logger: true });
server.register(socketIO, {
  cors: {
    origin: "*",
  },
});

server.ready(async (error) => {
  if (error) console.log(error), process.exit(1);
  await datasource.initialize();
  server.log.info(datasource.isInitialized ? "connection was successfuly created" : "failed to connect database");
  const onConnection = (socket: Socket) => {
    handler(server.io, socket);
  };
  server.io.on("connection", onConnection);
});

server.listen({ port: (process.env.HOST_PORT as any) || 4040, host: process.env.HOST_NAME || "localhost" });
