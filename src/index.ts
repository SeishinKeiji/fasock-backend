import "dotenv/config";
import { Socket } from "socket.io";
import fastify from "fastify";
import handler from "./handler";
import socketIO from "plugins/socket.io";
import { datasource } from "database";
import routes from "router";

const server = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
      },
    },
  },
});
server.register(socketIO, {
  cors: {
    origin: "*",
  },
});
routes.map((route) => {
  server.register(route);
});

server.ready(async (error) => {
  if (error) console.log(error), process.exit(1);
  await datasource.initialize();
  server.log.info(datasource.isInitialized ?
    "database connection was successfuly created" :
    "failed to connect database");
  const onConnection = (socket: Socket) => {
    handler(server.io, socket);
  };
  server.io.on("connection", onConnection);
});

server.listen({ port: (process.env.HOST_PORT as any) || 4040, host: process.env.HOST_NAME || "localhost" });
